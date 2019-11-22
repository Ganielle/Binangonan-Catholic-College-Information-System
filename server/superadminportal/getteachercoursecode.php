<?php 
  require_once("connection.php");
  $sy = $_POST['schoolyear'];
  $getdata = $conn->prepare("SELECT level_code FROM gradelevel_table WHERE level_yearbatch=? ORDER BY gid ASC");
  $output = "";
  try{
    $getdata->execute(array($sy));
    $output .='
      <option></option>
    ';
    while($row=$getdata->fetch()){
      $output .='
        <option value="'.$row['level_code'].'">'.$row['level_code'].'</option>
      ';
    }
  }
  catch(PDOException $e){
    $output = "SYSTEM ERROR";
  }
  echo json_encode($output);
?>