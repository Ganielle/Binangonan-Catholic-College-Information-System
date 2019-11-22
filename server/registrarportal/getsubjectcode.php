<?php 
    require_once('connection.php');
    $output = "";
    $schooly = $_POST['schooly'];
    $term = $_POST['term'];
    $course = $_POST['course'];
    //this will get the code
    $getcode = $conn->prepare("SELECT subject_code FROM subject_table WHERE coursecode=? AND term=? AND year=?");
    $getcode->setFetchMode(PDO::FETCH_ASSOC);
    try{
        $getcode->execute(array($course,$term,$schooly));
        $output .='
          <option></option>
        ';
        while($row = $getcode->fetch()){
            $output .='
                <option value="'.$row['subject_code'].'">'.$row['subject_code'].'</option>
            ';
        }
    }
    catch(PDOException $e){
        echo $e;
    }
    echo json_encode($output);
?>