<?php 
  require_once('connection.php');
  if(isset($_POST['getstud']) && $_POST['getstud'] == "getstud"){
    $schooly = $_POST['schooly'];
    $course = $_POST['course'];
    $sem = $_POST['sem'];
    $tablename = $course.$schooly.$sem."_table";
    $output = "";
    //this will get stud number
    $getdata = $conn->prepare("SELECT student_name FROM `$tablename` ORDER BY glid ASC");
    $getdata->setFetchMode(PDO::FETCH_ASSOC);
    $getdata->execute();
    $output .='
      <option></option>
    ';
    while($row=$getdata->fetch()){
      $output .='
        <option value="'.$row['student_name'].'">'.$row['student_name'].'</option>
      ';
    }
    echo json_encode($output);
  }
?>