<?php 
  require_once('connection.php');
  if(isset($_POST['search']) && $_POST['search'] == "search"){
    $output = "";
    $sy = $_POST['sy'];
    $ss = $_POST['ss'];
    $coursecode = $_POST['coursecode'];
    $subjectcode = $_POST['subjectcode'];
    $tablename = $subjectcode.$sy.$ss."_table";
    $gwa = 0;
    $finalgrade = 0;
    $grade = 0;
    //this is the percentage for prelim
    $prelimpercent = 30 / 100;
    $midpercent = 70 / 100;
    $prelimmid = 30 / 100;
    $finalpercent = 70 / 100;
    //this will get the data of students
    $getdata = $conn->prepare("SELECT * FROM `$tablename` ORDER BY snid ASC");
    $output .='
      <table class="table">
      <thead class="thead-dark">
          <tr>
              <th scope="col">STUDENT ID</th>
              <th scope="col">STUDENT NAME</th>
              <th scope="col">PRELIM</th>
              <th scope="col">MIDTERM</th>
              <th scope="col">FINALS</th>
              <th scope="col">FINAL GRADE</th>
          </tr>
      </thead>
    ';
    try{
      $getdata->execute();
      while($data = $getdata->fetch()){
        $output.='
          <tbody>
          <th scope="row">'.$data['sub_studid'].'</th>
          <td>'.$data['sub_studname'].'</td>
          <td><b>'.$data['stud_prelim'].'</b></td>
          <td><b>'.$data['stud_mid'].'</b></td>
          <td><b>'.$data['stud_finals'].'</b></td>
        ';
        if($data['stud_prelim'] != "" && $data['stud_mid'] != "" && $data['stud_finals'] != ""){
          $finalprelim = $data['stud_prelim'] * $prelimpercent;
          $finalmid = $data['stud_mid'] * $midpercent;
          $finalprelimmid = ($finalprelim + $finalmid) * $prelimmid;
          $finals = $data['stud_finals'] * $finalpercent;
          $finalgrade = $finalprelimmid + $finals;
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
    catch(PDOException $e){

    }
      $output .='
    
      </tbody>
        </table>
      ';
    echo json_encode($output);
  }
?>