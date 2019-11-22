<?php 
    require_once('connection.php');
    $output = array();
    if(isset($_POST['submit']) && $_POST['submit'] == 'submit'){
        $code = $_POST['subc'];
        $name = $_POST['subn'];
        $professor = $_POST['subprof'];
        $year = $_POST['syear'];
        $term = $_POST['lvlterm'];
        $course = $_POST['coursecode'];
        $tablename = strtoupper($code).$year.$term."_table";
        //this query will add subjects
        $add = $conn->prepare("INSERT INTO subject_table(subject_code,subject_name,subject_teacher,coursecode,term,year) VALUES(?,?,?,?,?,?) ");
        //this will check if the subject is existing
        $exist = $conn->prepare("SELECT subject_code FROM subject_table WHERE subject_code=? AND subject_name=? AND subject_teacher=? AND coursecode=? AND term=? AND year=?");
        //this will create table for subject section
        $create = $conn->prepare("CREATE TABLE IF NOT EXISTS `$tablename`(snid int NOT NULL AUTO_INCREMENT,sub_studid varchar(30),sub_studname varchar(50), stud_prelim varchar(4), stud_mid varchar(4),stud_finals varchar(4), PRIMARY KEY(snid))");
        try{
            $exist->execute(array(strtoupper($code),strtoupper($name),strtoupper($professor),$course,$term,$year));
            if($exist->rowCount() == 0){
                if($code == ""){
                    $output['stats'] = "errorcode";
                }
                else if($name == ""){
                    $output['stats'] = "errorname";
                }
                else if ($professor == ""){
                    $output['stats'] = "errorprof";
                }
                else{
                    $create->execute();
                    $add->execute(array(strtoupper($code),strtoupper($name),strtoupper($professor),$course,$term,$year));
                    $output['stats'] = "added";
                }
            }
            else{
                $output['stats'] = "existing";
            }
        }
        catch(PDOException $e){
            $output['stats'] = "systemerror";
        }
    }
    else{
        $output['stats'] = "systemerror";
    }
    echo json_encode($output);
?>