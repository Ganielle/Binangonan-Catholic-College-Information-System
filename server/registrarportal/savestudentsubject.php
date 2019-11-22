<?php 
  require_once('connection.php');
  if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
    $output = array();
    $schooly = $_POST['schooly'];
    $subject = $_POST['subject'];
    $sem = $_POST['sem'];
    $name = $_POST['name'];
    $course = $_POST['course'];
    $tablename = $subject.$schooly.$sem."_table";
    $coursetable = $course.$schooly.$sem."_table";
    //this will get the data count
    $countdata = $conn->prepare("SELECT enroll_studno FROM enrollsubject_table WHERE enroll_fullname=? AND enroll_subjcode=? AND enroll_sem=? AND enroll_schooly=?");
    $savedata = $conn->prepare("INSERT INTO enrollsubject_table(enroll_studno,enroll_fullname,enroll_subjcode,enroll_sem,enroll_schooly) VALUES(?,?,?,?,?)");
    $getname = $conn->prepare("SELECT student_id FROM `$coursetable` WHERE student_name=?");
    $savesubject = $conn->prepare("INSERT INTO `$tablename`(sub_studid,sub_studname) VALUES(?,?)");
    try{
      $countdata->execute(array($name,$subject,$sem,$schooly));
      $getname->execute(array($name));
      if($countdata->rowCount() == 0){
        while($row1 = $getname->fetch()){
          //this will savedata
          $savedata->execute(array($row1['student_id'],$name,$subject,$sem,$schooly));
          $savesubject->execute(array($row1['student_id'],$name));
        }
        $output['stats'] = "success";
      }
      else{
        $output['stats'] = "exist";
      }
    }
    catch(PDOException $e){
      $output['stats'] = "error";
    }
    echo json_encode($output);
  }
?>