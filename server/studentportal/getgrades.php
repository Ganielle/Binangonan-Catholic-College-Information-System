<?php 
  require_once('connection.php');
  if(isset($_COOKIE['token'])){
    $token = $_COOKIE['token'];
    $finaltoken = hash('sha256',$token);
    $output = "";
    $tablename = "";
    $gwa = 0;
    $finalgrade = 0;
    $grade = 0;
    //this is the percentage for prelim
    $prelimpercent = 30 / 100;
    $midpercent = 70 / 100;
    $prelimmid = 30 / 100;
    $finalpercent = 70 / 100;
    $studid = $conn->prepare("SELECT * FROM token WHERE token=?");
    $getcode = $conn->prepare("SELECT * FROM enrollsubject_table WHERE enroll_studno=?");
    $studid->setFetchMode(PDO::FETCH_ASSOC);
    $output .='
      <table class="table">
      <thead class="thead-dark">
          <tr>
              <th scope="col">SUBJECT CODE</th>
              <th scope="col">SUBJECT NAME</th>
              <th scope="col">PRELIM</th>
              <th scope="col">MIDTERM</th>
              <th scope="col">FINALS</th>
              <th scope="col">FINAL GRADE</th>
          </tr>
      </thead>
    ';
    try{
      
      $studid->execute(array($finaltoken));
      $row=$studid->fetch();
      $getcode->execute(array($row['user_id']));
      while($row2=$getcode->fetch()){
        $tablename = $row2['enroll_subjcode'].$row2['enroll_schooly'].$row2['enroll_sem']."_table";
        $getdata=$conn->prepare("SELECT * FROM `$tablename` WHERE sub_studid=?");
        $getsubjecttable = $conn->prepare("SELECT subject_name FROM subject_table WHERE subject_code=?");
        $getsubjecttable->execute(array($row2['enroll_subjcode']));
        $row1=$getsubjecttable->fetch();
        $getdata->execute(array($row['user_id']));
        while($row3=$getdata->fetch()){
          $output.='
          <tbody>
          <th scope="row">'.$row2['enroll_subjcode'].'</th>
          <td>'.$row1['subject_name'].'</td>
          <td><b>'.$row3['stud_prelim'].'</b></td>
          <td><b>'.$row3['stud_mid'].'</b></td>
          <td><b>'.$row3['stud_finals'].'</b></td>
          ';
          if($row3['stud_prelim'] != "" && $row3['stud_mid'] != "" && $row3['stud_finals'] != ""){
            $finalprelim = $row3['stud_prelim'] * $prelimpercent;
            $finalmid = $row3['stud_mid'] * $midpercent;
            $finalprelimmid = ($finalprelim + $finalmid) * $prelimmid;
            $finals = $row3['stud_finals'] * $finalpercent;
            $finalgrade = $finalprelimmid + $finals;
            $grade += $finalgrade;
            $gwa = $grade / $getcode->rowCount();
            $output .='
              <td>'.number_format((float)$finalgrade,2,'.','').'</td>
            ';
          }
          else{
            $output .='
              <td>N/A</td>
            ';
          }
        }
      }
    }
    catch(PDOException $e){

    }
    if($finalgrade == 0){
      $output .='
    
      </tbody>
        </table>
        <br/>
        <font size="15"><b>GWA: N/A.</b></font>
      ';
    }
    else{
      $output .='
      
      </tbody>
        </table>
        <br/>
        <font size="15"><b>GWA: '.number_format((float)$gwa,2,'.','').'</b></font>
      ';
    }
    echo json_encode($output);
  }
?>