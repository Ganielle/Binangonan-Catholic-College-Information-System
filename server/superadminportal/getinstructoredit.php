<?php 
  require_once("connection.php");
  if(isset($_POST['submit']) && $_POST['submit'] == 'submit'){
    $response = array();
    $id = $_POST['id'];
    //this will get the instructor data
    $getdata = $conn->prepare("SELECT * FROM teacher_table WHERE tid=?");
    try{
      $getdata->execute(array($id));
      $row = $getdata->fetch();
      $response['insid'] = $row['teacher_id'];
      $response['insfname'] = $row['teacher_fname']; 
      $response['insmname'] = $row['teacher_mname'];
      $response['inslname'] = $row['teacher_lname'];
      $response['insdept'] = $row['coursecode'];
    }
    catch(PDOException $e){
      $response['insid'] = $e;
    }
    echo json_encode($response);
  }
?>