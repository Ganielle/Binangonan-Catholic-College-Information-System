<?php 
  require_once('connection.php');
  $response = array();
  if(isset($_POST['submit']) && $_POST['submit'] == 'submit'){
    $studno = $_POST['studno'];
    $given = $_POST['given'];
    $mname = $_POST['mname'];
    $lname = $_POST['lname'];
    $course = $_POST['course'];
    $sem = $_POST['sem'];
    $schooly = $_POST['schooly'];
    $uname = $_POST['uname'];
    $pass = $_POST['pass'];
    $name = $given . " " . $mname . " " . $lname;
    $finalpass = hash('sha256',$pass);
    $coursetable = $course.$schooly.$sem.'_table';
    //this will add student to the course
    $addcourse = $conn->prepare("INSERT INTO `$coursetable`(student_id,student_name) VALUES(?,?)");
    //this will create login student
    $addlogin = $conn->prepare("INSERT INTO login_table(user_number,username,password,userlevel) VALUES(?,?,?,?)");
    //this will count the existing students
    $existlogin = $conn->prepare("SELECT user_number FROM login_table WHERE user_number=? OR username=?");
    if($studno != "" && $name != "" && $course != "" && $sem != "" && $schooly != "" && $uname != "" && $pass != ""){
      try{
        $existlogin->execute(array($studno,strtoupper($name)));
        if($existlogin->rowCount() == 0){
          if($addcourse->execute(array(strtoupper($studno),strtoupper($name))) && $addlogin->execute(array(strtoupper($studno),$uname,$finalpass,strtoupper("STUDENT")))){
            $response['stats'] = "success";
          }
          else{
            $response['stats'] = "error";
          }
        }
        else{
          $response['stats'] = "existing";
        }
      }
      catch(PDOException $e){
        $response['stats'] = "systemerror";
      }
    }
    else{
      $response['stats'] = "systemerror";
    }
    echo json_encode($response);
  }
?>