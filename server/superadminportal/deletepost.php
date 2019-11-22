<?php 
    require_once('connection.php');
    $output = array();
    if(isset($_POST['submit']) && $_POST['submit'] == 'submit' && $_POST['varid'] != ""){
        $id = $_POST['varid'];
        //this will delete the data
        $delete = $conn->prepare("DELETE FROM announcement_table WHERE atid=?");
        try{
            if($id == ""){
                $output['stats'] = "systemerror";
            }
            else{
                $delete->execute(array($id));
                $output['stats'] = "success";
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