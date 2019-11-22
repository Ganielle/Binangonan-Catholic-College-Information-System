<?php 
  require_once("connection.php");
  if(isset($_POST['id'])){
    $output = array();
    $id = $_POST['id'];
    //this will get the data
    $getdata = $conn->prepare("SELECT * FROM subject_table WHERE sid=?");
    try{
      $getdata->execute(array($id));
      while($data = $getdata->fetch()){
        $output['code'] = $data['subject_code'];
        $output['desc'] = $data['subject_name'];
        $output['prof'] = $data['subject_teacher'];
        $output['ccode'] = $data['coursecode'];
        $output['sem'] = $data['term'];
        $output['year'] = $data['year']; 
      }
    }
    catch(PDOException $e){
    }
    echo json_encode($output);
  }
?>