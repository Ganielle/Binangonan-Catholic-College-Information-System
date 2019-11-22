<?php 
    require_once('connection.php');
    if(isset($_POST['submit']) && $_POST['submit'] == 'submit'){
        $output = array();
        $id = $_POST['gradeid'];
        if($id != ""){
            //this will delete the data
            $query = $conn->prepare("DELETE FROM gradelevel_table WHERE gid=?");
            //this will get the level name code and batch
            $level = $conn->prepare("SELECT level_code,level_name,level_yearbatch,level_term FROM gradelevel_table WHERE gid=?");
            try{
                $level->setFetchMode(PDO::FETCH_ASSOC);
                $level->execute(array($id));
                $row = $level->fetch();
                $gradelevel = $row['level_code'].$row['level_yearbatch'].$row['level_term']."_table";
                    //this will delete table
                $deletetable = $conn->prepare("DROP TABLE `$gradelevel`");
                $deletetable->execute();
                $query->execute(array($id));
                $output['stats'] = "success";
            }
            catch(PDOException $e){
                $output['stats'] = "systemerror";
            }
        }
        else{
            $output['stats'] = "error";
        }
        echo json_encode($output);
    }
?>