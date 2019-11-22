<?php 
  require_once('connection.php');
  $response = array();
  if(isset($_POST['change']) && $_POST['change'] == "change"){
    $term = $_POST['term'];
    $schooly = $_POST['schooly'];
      //this will get the data
      $getdata = $conn->prepare("SELECT level_code FROM gradelevel_table WHERE level_term=? AND level_yearbatch=?");
      $getdata->setFetchMode(PDO::FETCH_ASSOC);
      try{
        $getdata->execute(array(strtoupper($term),$schooly));
        if($getdata->rowCount() > 0){
          $response['stats'] = "exist";
        }
        else{
          $response['stats'] = "notexist";
        }
      }
      catch(PDOException $e){
        $response['stats'] = "systemerror";
      }
    echo json_encode($response);
  }
?>