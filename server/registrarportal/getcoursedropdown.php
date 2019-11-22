<?php 
    require_once('connection.php');
    $output = "";
    $year = $_POST['time'];
    //this will get the data
    $getdata  = $conn->prepare("SELECT level_code FROM gradelevel_table WHERE level_yearbatch=?");
    try{
        $getdata->execute(array($year));
        if($getdata->rowCount() == 0){
            $output .='
                <option>THERES NO EXISTING COURSE FOR THIS SCHOOL YEAR!</option>
            ';
        }
        else{
            while($row=$getdata->fetch()){
                $output .='
                    <option value="'.$row['level_code'].'">'.$row['level_code'].'</option>
                ';
            }
        }
    }
    catch(PDOException $e){
        $output .='
            <option>SYSTEM ERROR</option>
        ';
    }
    echo json_encode($output);
?>