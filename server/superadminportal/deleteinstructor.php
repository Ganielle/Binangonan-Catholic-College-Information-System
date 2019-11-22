<?php 
  require_once("connection.php");
  $response = array();
  if(isset($_POST['delete']) && $_POST['delete'] == "delete"){
    $id = $_POST['id'];
    //this will delete instructor
    $delete = $conn->prepare("DELETE FROM teacher_table WHERE tid=?");
    //this will get instructor id
    $getid = $conn->prepare("SELECT teacher_id FROM teacher_table WHERE tid=?");
    try{
      $getid->execute(array($id));
      $insid = $getid->fetch();
      //this will delete instructor login
      $deletelogin = $conn->prepare("DELETE FROM login_table WHERE user_number=?");
      if($deletelogin->execute(array($insid['teacher_id'])) && $delete->execute(array($id))){
        $response['stats'] = "success";
      }
      else{
        $response['stats'] = "fail";
      }
    }
    catch(PDOException $e){
      $response['stats'] = $e;
    }
  }
  else{
    $response['stats'] = "systemerror";
  }
  echo json_encode($response);
?>