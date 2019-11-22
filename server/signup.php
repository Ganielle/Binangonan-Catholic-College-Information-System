<?php 

    require_once("connection.php");
    if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
        $response = array();
        $uname = $_POST['usern'];
        $pass = $_POST['pass'];
        $userno = $_POST['usernumber'];
        $finalpass = hash('sha256',$pass);
        $signup=$conn->prepare("INSERT INTO login_table(user_number,username,password,userlevel) VALUES(?,?,?,?)");
        try{
            $signup->execute(array($userno,$uname,$finalpass,"SUPER ADMIN"));
            $response['stats'] = "success";
        }
        catch(PDOException $e){
            $response['stats'] = "error";
        }
        echo json_encode($response);
    }
?>