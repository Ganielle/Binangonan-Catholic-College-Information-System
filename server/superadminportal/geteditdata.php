<?php 
  require_once('connection.php');
  if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
    $id = $_POST['sendid'];
    $data = array();
    //this will get the data in table
    $getdata = $conn->prepare("SELECT level_name,level_code,level_yearbatch,level_term FROM gradelevel_table WHERE gid=?");
    $getdata->setFetchMode(PDO::FETCH_ASSOC);
    try{
      $getdata->execute(array($id));
      while($row=$getdata->fetch()){
          $data['code'] = $row['level_code'];
          $data['name'] = $row['level_name'];
          $data['year'] = $row['level_yearbatch'];
          $data['term'] = strtolower($row['level_term']);
      }
    }
    catch(PDOException $e){
      echo "you have an error";
    }
    echo json_encode($data);
  }
?>