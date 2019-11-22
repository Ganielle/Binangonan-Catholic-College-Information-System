<?php 
  require_once("connection.php");
  if(isset($_POST['edit']) && $_POST['edit'] == "edit"){
    $response = array();
    $id = $_POST['id'];
    $insfname = $_POST['insfname'];
    $insmname = $_POST['insmname'];
    $inslname = $_POST['inslname'];
    $insdept = $_POST['insdept'];
    $insid = $_POST['insid'];
    $newname = $insfname . " " . $insmname . " " . $inslname;
    //this will get name of instructor
    $getname = $conn->prepare("SELECT teacher_fname,teacher_mname,teacher_lname FROM teacher_table WHERE tid=?");
    //
    $existing = $conn->prepare("SELECT * FROM teacher_table WHERE teacher_fname=? AND teacher_mname=? AND teacher_lname=? AND teacher_id=?");
    try{
      $existing->execute(array($insfname,$insmname,$inslname,$insid));
      if($existing->rowCount() > 0){
        $response['stats'] = "exist";
      }
      else{
        $getname->execute(array($id));
        $name = $getname->fetch();
        $oldname = $name['teacher_fname']." ".$name['teacher_mname']." ".$name['teacher_lname'];
        //this will edit instructor on subject table
        $editname = $conn->prepare("UPDATE subject_table SET subject_teacher=? WHERE subject_teacher=?");
        //this will edit instructor
        $update = $conn->prepare("UPDATE teacher_table SET teacher_id=?,teacher_fname=?,teacher_mname=?,
                                  teacher_lname=?,coursecode=? WHERE tid=?");
        if($editname->execute(array($newname,$oldname)) && $update->execute(array($insid,$insfname,$insmname,$inslname,$insdept,$id))){
          $response['stats'] = "success";
        }
        else{
          $response['stats'] = "failed";
        }
      }
    }
    catch(PDOException $e){
      $response['stats'] = "error";
    }
    echo json_encode($response);
  }
?>