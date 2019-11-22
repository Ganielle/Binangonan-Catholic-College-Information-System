<?php 
    require_once("connection.php");
    $response = array();
    if(isset($_POST['logout']) && $_POST['logout'] == "logout" && isset($_COOKIE['token'])){
        $response=array();
        $token = $_COOKIE['token'];
        $finaltoken = hash('sha256',$token);
        //logout
            $logout = $conn->prepare("DELETE FROM token WHERE token=?");
            $logout->execute(array($finaltoken));
            $response['stats']="loggingout";
    }
    else{
      $response['stats']="loggingout";
    }
    
    echo json_encode($response);
?>