<?php 
    require_once("connection.php");
    if(isset($_COOKIE['token'])){
        $response = array();
        $token = $_COOKIE['token'];
        $finaltoken = hash("sha256",$token);
        $id = "";
        //this will get the user id
        $getid = $conn->prepare("SELECT user_id FROM token WHERE token=?");
        try{
        }   
        catch(PDOException $e){

        }
        echo json_encode($response);
    }
?>