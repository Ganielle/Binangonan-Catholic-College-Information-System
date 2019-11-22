<?php 
  require_once('connection.php');
  $output = "";
  if(isset($_POST['change']) && $_POST['change'] == "change"){
    $name = $_POST['name'];
    $term = $_POST['term'];
    $schooly = $_POST['schooly'];
      //this will get the data
      $getdata = $conn->prepare("SELECT coursecode FROM subject_table WHERE subject_teacher=? AND term=? AND year=?");
      $getdata->setFetchMode(PDO::FETCH_ASSOC);
        $getdata->execute(array($name,strtoupper($term),$schooly));
        $output .='
          <option></option>
        ';
          while($row=$getdata->fetch()){
            $output .= '
              <option value="'.$row['coursecode'].'">'.$row['coursecode'].'</option>
            ';
          }
    echo json_encode($output);
  }
?>