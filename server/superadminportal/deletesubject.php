<?php 
    require_once('connection.php');
    if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
        $id = $_POST['delid'];
        $output = array();
        $tablename = "";
        //this query will delete
        $delete = $conn->prepare("DELETE FROM subject_table WHERE sid=?");
        //this will get the code,year,term
        $getdata = $conn->prepare("SELECT subject_code,term,year FROM subject_table WHERE sid=?");
        try{
            $getdata->execute(array($id));
            while($row=$getdata->fetch()){
                $tablename = $row['subject_code'].$row['year'].$row['term']."_table";
            }
            //drop table
            $drop = $conn->prepare("DROP TABLE `$tablename`");
            $drop->execute();
            $delete->execute(array($id));
            $output['stats'] = "success";
        }
        catch(PDOException $e){
            $output['stats'] = "systemerror";
        }
        echo json_encode($output);
    }
?>