<?php 
    require_once('connection.php');
    $content = "";
    $getsubject = $conn->prepare("SELECT * FROM teacher_table ORDER BY tid ASC");
        $getsubject->setFetchMode(PDO::FETCH_ASSOC);
        $getsubject->execute();
        $content .='
        <option></option>
        ';
        while($row=$getsubject->fetch()){
        //content of the subject
        $content .='
            <option value="'.$row['teacher_fname']." ".$row['teacher_mname']." ".$row['teacher_lname'].'">'.$row['teacher_fname']." ".$row['teacher_mname']." ".$row['teacher_lname'].'</option>
        ';
        }
    echo json_encode($content);
?>