<?php 
  require_once("connection.php");
  $output = "";
  //this will get the data
  $getdata = $conn->prepare("SELECT * FROM teacher_table ORDER BY tid");
  try{
    $getdata->execute();
    if($getdata->rowCount() > 0){
      $output .= '
        <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">INSTRUCTOR ID</th>
                <th scope="col">INSTRUCTOR FIRST NAME</th>
                <th scope="col">INSTRUCTOR MIDDLE NAME</th>
                <th scope="col">INSTRUCTOR LAST NAME</th>
                <th scope="col">INSTRUCTOR DEPT.</th>
                <th scope="col">ACTION</th>
            </tr>
        </thead>
      ';
      while($row=$getdata->fetch()){
        $output .='
          <tbody>
            <th scope="row">'.$row['teacher_id'].'</th>
            <td>'.$row['teacher_fname'].'</td>
            <td>'.$row['teacher_mname'].'</td>
            <td>'.$row['teacher_lname'].'</td>
            <td>'.$row['coursecode'].'</td>
            <td>
            <div class="row">
            <div class="col-xs-4 col-md-4 thumb">
            <button type="button" class="editbtn btn btn-info" id="'.$row['tid'].'">Edit</button>
            </div>
            <div class="col-xs-4 col-md-4 thumb" id="btndelete">
            <button type="button" class="deletebtn btn btn-info" id="'.$row['tid'].'">Delete</button>
            </div>
            </div>
            </td>
          </tbody>
        ';
      }
    }
    else{
      $output .='
        <div class="card shadow-lg">
        <div class="card-body">
            <center>
                NO INSTRUCTOR IS YET CREATED !
            </center>
        </div>
        </div>
      ';
    }
  }
  catch(PDOException $e){

  }
  echo json_encode($output);
?>