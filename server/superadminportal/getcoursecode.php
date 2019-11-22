<?php 
  require_once('connection.php');
  $output = "";
  if(isset($_POST['change']) && $_POST['change'] == "change"){
    $term = $_POST['term'];
    $schooly = $_POST['schooly'];
      //this will get the data
      $getdata = $conn->prepare("SELECT level_code FROM gradelevel_table WHERE level_term=? AND level_yearbatch=?");
      $getdata->setFetchMode(PDO::FETCH_ASSOC);
        $getdata->execute(array(strtoupper($term),$schooly));
        $output .='
          <option></option>
        ';
          while($row=$getdata->fetch()){
            $output .= '
              <option value="'.$row['level_code'].'">'.$row['level_code'].'</option>
            ';
          }
    echo json_encode($output);
  }
  else if(isset($_POST['insdept']) && $_POST['insdept'] == "insdept"){
    $year = $_POST['by'];
    //this will get data
    $getdata = $conn->prepare("SELECT level_code FROM gradelevel_table WHERE level_yearbatch=?");
    $getdata->setFetchMode(PDO::FETCH_ASSOC);
    $getdata->execute(array($year));
    $output .='
      <option></option>
    ';
      while($row=$getdata->fetch()){
        $output .= '
          <option value="'.$row['level_code'].'">'.$row['level_code'].'</option>
        ';
      }
    echo json_encode($output);
  }
?>