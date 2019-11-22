<?php 
  require_once("connection.php");
  if(isset($_COOKIE['token'])){
    $output = "";
    $token = $_COOKIE['token'];
    $finaltoken = hash("sha256",$token);
    //this will get the student number
    $getno = $conn->prepare("SELECT user_id FROM token WHERE token=?");
    //this will get the name
    $getname = $conn->prepare("SELECT enroll_fullname FROM enrollsubject_table WHERE enroll_studno=? ORDER BY esid ASC LIMIT 1");
    try{
      $getno->execute(array($finaltoken));
      $no = $getno->fetch();
      $getname->execute(array($no['user_id']));
      $name = $getname->fetch();
      $output .='
        <font size="5"><b>Student Number:</b> '.$no['user_id'].'</font><br/>
        <font size="5"><b>Student Name:</b> '.$name['enroll_fullname'].'</font><br/>
        <hr>
      ';
    }
    catch(PDOException $e){
      $output ="error";
    }
    echo json_encode($output);
  }
?>