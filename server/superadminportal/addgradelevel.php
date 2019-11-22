<?php 
    require_once('connection.php');
    if(isset($_POST['submit']) && $_POST['submit'] == 'submit'){
        $output = array();
        $lvlcode = $_POST['lvlcode'];
        $lvlname = $_POST['lvlname'];
        $lvlbatch = $_POST['lvlbatch'];
        $lvlterm = $_POST['lvlterm'];
        $gradetable = strtoupper($lvlcode).$lvlbatch.$lvlterm."_table";
        //this will add to the gradelevel table
        $addinggrade = $conn->prepare("INSERT INTO gradelevel_table(level_code,level_name,level_yearbatch,level_term) VALUES(?,?,?,?)");
        //this will create table if not existing for list of student in gradelevel
        $creategradetable = $conn->prepare("CREATE TABLE IF NOT EXISTS `$gradetable`(glid int NOT NULL AUTO_INCREMENT, student_id varchar(20), student_name varchar(60), PRIMARY KEY(glid))");
        //this will check if the gradelevel is existing
        $existgradelevel = $conn->prepare("SELECT level_code FROM gradelevel_table WHERE level_code=? AND level_name=? AND level_yearbatch=? AND level_term=?");
        if($lvlcode != "" && $lvlname != "" && $lvlbatch != "" && $lvlterm != ""){
            try{
                $existgradelevel->execute(array(strtoupper($lvlcode),strtoupper($lvlname),strtoupper($lvlbatch),$lvlterm));
                if($existgradelevel->rowCount() == 0){
                    $addinggrade->execute(array(strtoupper($lvlcode),strtoupper($lvlname),strtoupper($lvlbatch),$lvlterm));
                    $creategradetable->execute();
                    $output['stats'] = "success";
                }
                else{
                    $output['stats'] = "exist";
                }
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