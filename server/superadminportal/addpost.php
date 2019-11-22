<?php 
    require_once('connection.php');
    $output = "";
    if(isset($_POST['submit']) && $_POST['submit'] == "submit"){
        $posting = $_POST['posting'];
        date_default_timezone_set('Asia/Manila');
        $timestamp = time();
        $datetoday = date("F d, Y h:i:s A", $timestamp);
        //this query will add the post
        $adding = $conn->prepare("INSERT INTO announcement_table(ann_post,ann_time) VALUES(?,?)");
        try{
            if($posting != ""){
                $adding->execute(array($posting,$datetoday));
                $output = "success";
            }
            else{
                $output = "error";
            }
        }
        catch(PDOException $e){
            $output="systemerror";
        }
    }
    else{
        $output = "systemerror";
    }
    echo json_encode($output);
?>