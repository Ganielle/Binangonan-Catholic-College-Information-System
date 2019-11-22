<?php
  require_once("connection.php");
  if(isset($_POST['edit']) && $_POST['edit'] == "edit"){
    $output = array();
    $id = $_POST['id'];
    $code = $_POST['code'];
    $desc = $_POST['desc'];
    $ccode = $_POST['ccode'];
    $prof = $_POST['prof'];
    $sem = $_POST['sem'];
    $year = $_POST['year'];
    $newtable = $code.$year.$sem."_table";
    //this will get old code name table
    $getold = $conn->prepare("SELECT subject_code,term,year FROM subject_table WHERE sid=?");
    //count
    $countexist = $conn->prepare("SELECT subject_code,subject_name,subject_teacher,coursecode,term,year FROM subject_table
        WHERE subject_code=? AND subject_name=? AND subject_teacher=? AND coursecode=? AND term=? AND year=? AND sid=?");
    try{
      $getold->execute(array($id));
      $table = $getold->fetch();
      $oldtable = $table['subject_code'].$table['year'].$table['term']."_table";
      //this will update the tablename
      $updatetable = $conn->prepare("RENAME TABLE `$oldtable` TO `$newtable`");
      $countexist->execute(array($code,$desc,$prof,$ccode,$sem,$year,$id));
      //this will update the data
      $update = $conn->prepare("UPDATE subject_table SET subject_code=?,subject_name=?,subject_teacher=?,coursecode=?,
                                term=?,year=? WHERE sid=?");
      if($countexist->rowCount() > 0){
        $output['stats'] = "existing";
      }
      else{
        if($updatetable->execute() && $update->execute(array($code,$desc,$prof,$ccode,$sem,$year,$id))){
          $output['stats'] = "success";
        }
        else{
          $output['stats'] = "systemerror";
        }
      }
    }
    catch(PDOException $e){
      $output['stats'] == $e;
    }
    echo json_encode($output);
  }
?>