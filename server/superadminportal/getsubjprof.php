<?php 
  require_once("connection.php");
  if(isset($_POST['id'])){
    $output = "";
    $id = $_POST['id'];
    //this will get the subject course code
    $getcourse = $conn->prepare("SELECT coursecode FROM subject_table WHERE sid=?");
    try{
      $getcourse->execute(array($id));
      $course = $getcourse->fetch();
      //this will get the prof name
      $getname = $conn->prepare("SELECT teacher_fname,teacher_mname,teacher_lname FROM teacher_table WHERE coursecode=?");
      $getname->execute(array($course['coursecode']));
      $output .='
        <option></option>
      ';
      while($name=$getname->fetch()){
        $fullname = $name['teacher_fname']." ".$name['teacher_mname']." ".$name['teacher_lname'];
        $output .='
          <option value="'.$fullname.'">'.$fullname.'</option>
        ';
      }
    }
    catch(PDOException $e){
      $output = $e;
    }
    echo json_encode($output);
  }
?>