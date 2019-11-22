<?php 
  require_once('connection.php');
  if(isset($_POST['getstud']) && $_POST['getstud'] == "getstud"){
    $schooly = $_POST['schooly'];
    $subject = $_POST['subject'];
    $sem = $_POST['sem'];
    $tablename = $subject.$schooly.$sem."_table";
    $output = "";
    //this will get stud number
    $getdata = $conn->prepare("SELECT sub_studname FROM `$tablename` ORDER BY snid ASC");
    $getdata->setFetchMode(PDO::FETCH_ASSOC);
    $getdata->execute();
    $output .='
      <option></option>
    ';
    while($row=$getdata->fetch()){
      $output .='
        <option value="'.$row['sub_studname'].'">'.$row['sub_studname'].'</option>
      ';
    }
    echo json_encode($output);
  }
?>