<?php 
    require_once("connection.php");
    if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
        $output = array();
        $id = $_POST['id'];
        $given = $_POST['given'];
        $mname = $_POST['mname'];
        $surname = $_POST['surname'];
        $coursecode = $_POST['coursecode'];
        $uname = $_POST['uname'];
        $pass = $_POST['pass'];
        $name = $given . " " . $mname . " " . $surname;
        $finalpass = hash('sha256',$pass);
        //this will add teacher
        $add = $conn->prepare("INSERT INTO teacher_table(teacher_id,teacher_fname,teacher_mname,teacher_lname,coursecode) VALUES(?,?,?,?,?)");
        //this will add login
        $addlogin = $conn->prepare("INSERT INTO login_table(user_number,username,password,userlevel) VALUES(?,?,?,?)");
        //this will count the existing students
        $existlogin = $conn->prepare("SELECT user_number FROM login_table WHERE user_number=? OR username=?");
        if($id != "" or $name != ""){
            try{
                $existlogin->execute(array($id,strtoupper($uname)));
                if($existlogin->rowCount() == 0){
                    $addlogin->execute(array(strtoupper($id),$uname,$finalpass,strtoupper("INSTRUCTOR")));
                    $add->execute(array($id,strtoupper($given),strtoupper($mname),strtoupper($surname),$coursecode));
                    $output['stats'] = "success";
                }
                else{
                    $output['stats'] = "exist";
                }
            }
            catch(PDOException $e){
                $output['stats'] = "error";
            }
        }
        else{
            $output['stats'] = "incomplete";
        }
        echo json_encode($output);
    }
?>