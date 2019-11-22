<?php 
  require_once('connection.php');
  if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
    $output = "";
    $schooly = $_POST['schooly'];
    $sem = $_POST['sem'];
    $course = $_POST['course'];
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $term = $_POST['term'];
    $studno = $_POST['studno'];
    $tablename = $subject.$schooly.$sem."_table";
    //this will get the student info
    $getdata = $conn->prepare("SELECT * FROM  `$tablename` WHERE sub_studname=? ORDER BY snid ASC");
    $getdata->setFetchMode(PDO::FETCH_ASSOC);
    try{
      $getdata->execute(array($studno));
      $output .='
        <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">STUDENT ID</th>
                <th scope="col">FULL NAME</th>
                
      ';
      if($term == "prelim"){
        $output .='
                <th scope="col">PRELIMINARY</th>
                <th scope="col">ACTION</th>
                </tr>
            </thead>
            ';
      }
      elseif($term == "midterm"){
        $output .='
                <th scope="col">MIDTERM</th>
                <th scope="col">ACTION</th>
                </tr>
            </thead>
            ';
      }
      elseif($term == "finals"){
        $output .='
                <th scope="col">FINALS</th>
                <th scope="col">ACTION</th>
                </tr>
            </thead>
            ';
      }
      $row = $getdata->fetch();
          $output .='
            <tbody>
              <th scope="row">'.$row['sub_studid'].'</th>
              <td>'.$row['sub_studname'].'</td>
              <td><input type="text" class="gradetxt form-control" onkeyup="getgrades()" id="'.$row['snid'].'" placeholder="INPUT GRADE"></td>
              <td><input type="submit" class="submitbtn btn btn-primary" onclick="submitgrade()" id="'.$row['snid'].'" placeholder="SAVE"></td>
            </tbody>
          ';
    }
    catch(PDOException $e){
      $output = "error";
    }
    echo json_encode($output);
  }
?>