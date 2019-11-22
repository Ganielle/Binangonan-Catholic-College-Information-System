<?php
    require_once("connection.php");
    $response=array();
    if(isset($_COOKIE['token'])){
      $token = $_COOKIE['token'];
      $finaltoken = hash('sha256',$token);
      //userlevel
      $getuserlevel = $conn->prepare("SELECT userlevel FROM token WHERE token=?");
      $userlevel = "";
      try{
          $getuserlevel->execute(array($finaltoken));
          while($row=$getuserlevel->fetch()){
            $userlevel = $row['userlevel'];
          }
          if($userlevel == "SUPER ADMIN"){
            $response['stats'] = "SUPER ADMIN";
          }
          else if($userlevel == "REGISTRAR"){
            $response['stats'] = "REGISTRAR";
          }
          else if($userlevel == "STUDENT"){
            $response['stats'] = "STUDENT";
          }
          else if($userlevel == "INSTRUCTOR"){
            $response['stats'] = "INSTRUCTOR";
          }
      }
      catch(PDOException $e){
          $response['stats'] = "error";
      }
    }
    else{
      $response['stats'] = "notsignin";
    }
    echo json_encode($response);
?>