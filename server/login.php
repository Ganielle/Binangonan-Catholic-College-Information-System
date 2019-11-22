<?php 
    require_once('connection.php');
    if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
        $response = array();
        $uname = $_POST['uname'];
        $pass = $_POST['pass'];
        $finalpass = hash('sha256',$pass);
        $createRandId = md5(uniqid(rand(),TRUE));
        $finaltoken = hash('sha256',$createRandId);
        //userlevel
        $userlevel = $conn->prepare("SELECT userlevel,user_number FROM login_table WHERE username=? AND password=?");
        $userlevel->setFetchMode(PDO::FETCH_ASSOC);
        try{
            $userlevel->execute(array($uname,$finalpass));
            $row = $userlevel->fetch();
            if($row['userlevel'] == "SUPER ADMIN"){
                //TOKEN
                setcookie('token',$createRandId, time()+60*60*24*5);
                $token = $conn->prepare("INSERT INTO token(user_id,username,userlevel,token) VALUES(?,?,?,?)");
                $token->execute(array($row['user_number'],$uname,$row['userlevel'],$finaltoken));
                $response['stats'] = "SUPER ADMIN";
            }
            else if($row['userlevel'] == "INSTRUCTOR"){
                //TOKEN
                setcookie('token',$createRandId, time()+60*60*24*5);
                $token = $conn->prepare("INSERT INTO token(user_id,username,userlevel,token) VALUES(?,?,?,?)");
                $token->execute(array($row['user_number'],$uname,$row['userlevel'],$finaltoken));
                $response['stats'] = "INSTRUCTOR";
            }
            else if($row['userlevel'] == "STUDENT"){
                //TOKEN
                setcookie('token',$createRandId, time()+60*60*24*5);
                $token = $conn->prepare("INSERT INTO token(user_id,username,userlevel,token) VALUES(?,?,?,?)");
                $token->execute(array($row['user_number'],$uname,$row['userlevel'],$finaltoken));
                $response['stats'] = "STUDENT";
            }
            else if($row['userlevel'] == "REGISTRAR"){
                //TOKEN
                setcookie('token',$createRandId, time()+60*60*24*5);
                $token = $conn->prepare("INSERT INTO token(user_id,username,userlevel,token) VALUES(?,?,?,?)");
                $token->execute(array($row['user_number'],$uname,$row['userlevel'],$finaltoken));
                $response['stats'] = "REGISTRAR";
            }
            else{
                $response['stats'] = "notexist";
            }
        }   
        catch(PDOException $e){
            $response['stats'] = "error";
        }
        echo json_encode($response);
    }
?>