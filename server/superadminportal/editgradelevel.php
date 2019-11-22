<?php 
    require_once('connection.php');
    if(isset($_POST['submit']) && $_POST['submit'] == 'submit'){
        $response = array();
        $id = $_POST['id'];
        $name = $_POST['cname'];
        $code = $_POST['ccode'];
        $year = $_POST['cschooly'];
        $term = $_POST['cterm'];
        $databasename = "";
        $updatetablename = strtoupper($code).$year."_table";
        //this query will update the name of course
        $update = $conn->prepare("UPDATE gradelevel_table SET level_name=?,level_code=?,level_yearbatch=?,level_term=? WHERE gid=?");
        //this query will get the table name
        $tablename = $conn->prepare("SELECT level_code,level_yearbatch FROM gradelevel_table WHERE gid=?");
        //this query will check if the course is existing
        $exist = $conn->prepare("SELECT level_code FROM gradelevel_table WHERE level_code=? AND level_name=? AND level_yearbatch=? AND level_term=?");
        try{
            $exist->execute(array(strtoupper($code),strtoupper($name),strtoupper($year),$term));
            //this function will check if exist
            if ($exist->rowCount() == 0){
                $tablename->execute(array($id));
                $tablename->setFetchMode(PDO::FETCH_ASSOC);
                while($row = $tablename->fetch()){
                    $databasename = $row['level_code'].$row['level_yearbatch'].$term."_table";
                    $updatedatabasename = $conn->prepare("RENAME TABLE `$databasename` TO `$updatetablename`");
                    $updatedatabasename->execute();
                }
                $update->execute(array(strtoupper($name),strtoupper($code),strtoupper($year),$term,$id));
                $response['stats'] = "success";
            }
            else{
                $response['stats'] = "exist";
            }
        }
        catch(PDOException $e){
            $response['stats'] = "error";
        }
        echo json_encode($response);
    }
?>