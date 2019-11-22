<?php
  require_once('connection.php');
  if(isset($_POST['submit']) && $_POST['submit'] == 'submit'){
    $totalgrade = $_POST['totalgrade'];
    $name = $_POST['name'];
    $sy = $_POST['sy'];
    $sem = $_POST['sem'];
    $course = $_POST['course'];
    $subject = $_POST['subject'];
    $term = $_POST['term'];
    $studname = $_POST['studname'];
    $output = array();
    $tablename = $subject.$sy.$sem."_table";
    //this will search the table
    $getstud = $conn->prepare("SELECT sub_studname FROM `$tablename` WHERE sub_studname=?");
    try{
      $getstud->execute(array($studname));
      if($getstud->rowCount() > 0){
        if($term == "prelim"){
          $addgrade = $conn->prepare("UPDATE `$tablename` SET stud_prelim=? WHERE sub_studname=?");
          $addgrade->execute(array($totalgrade,$studname));
          $output['stats'] = 'success';
        }
        else if($term == "midterm"){
          $addgrade = $conn->prepare("UPDATE `$tablename` SET stud_mid=? WHERE sub_studname=?");
          $addgrade->execute(array($totalgrade,$studname));
          $output['stats'] = 'success';
        }
        else if($term == "finals"){
          $addgrade = $conn->prepare("UPDATE `$tablename` SET stud_finals=? WHERE sub_studname=?");
          $addgrade->execute(array($totalgrade,$studname));
          $output['stats'] = 'success';
        }
      }
      else{
        $output['stats'] = "error";
      }
    }
    catch(PDOException $e){
      $output['stats'] == $e;
    }
    echo json_encode($output);
  }
?>