<?php 
    require_once('connection.php');
    $output = "";
    $token = $_COOKIE['token'];
    $finaltoken = hash('sha256',$token);
    //this will get the user id
    $userid = $conn->prepare("SELECT user_id FROM token WHERE token=?");
    $userid->setFetchMode(PDO::FETCH_ASSOC);
    try{
        if($token != ""){
            $userid->execute(array($finaltoken));
            $row = $userid->fetch();
            //this will get the name
            $name = $conn->prepare("SELECT * FROM teacher_table WHERE teacher_id=?");
            $name->setFetchMode(PDO::FETCH_ASSOC);
            $name->execute(array($row['user_id']));
            while($row=$name->fetch()){
                $output .=$row['teacher_fname']." ".$row['teacher_mname']." ".$row['teacher_lname'];
            }
        }
    }
    catch(PDOException $e){
        $output .='SYSTEM ERROR';
    }
    echo json_encode($output);
?>