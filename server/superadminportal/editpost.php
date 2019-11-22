<?php 
    require_once('connection.php');
    $output = array();
    if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
        $id = $_POST['varid'];
        $editdata = $_POST['editdata'];
        date_default_timezone_set('Asia/Manila');
        $timestamp = time();
        $datetoday = "Edited: ".date("F d, Y h:i:s A", $timestamp);
        $update = $conn->prepare("UPDATE announcement_table SET ann_post=?,ann_time=? WHERE atid=?");
        if($id != "" && $editdata != ""){
            try{
                $update->execute(array($editdata,$datetoday,$id));
                $output['stats'] = "success";
            }
            catch(PDOException $e){
                $output['stats'] = "servererror";
            }
        }
        else{
            $output['stats'] = "servererror";
        }
        echo json_encode($output);
    }
    
  else if(isset($_POST['insdept']) && $_POST['insdept'] == "insdept"){
    $response =
  }
?>