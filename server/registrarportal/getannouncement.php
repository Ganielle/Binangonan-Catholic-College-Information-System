<?php 
    require_once('connection.php');
    $output = "";
    //this will get the post data
    $getdata = $conn->prepare("SELECT atid,ann_post,ann_time FROM announcement_table ORDER BY atid DESC");
    //this will count if there is data
    $countdata = $conn->prepare("SELECT ann_post FROM announcement_table");
    try{    
        $countdata->execute();
        if($countdata->rowCount() == 0){
            $output .= '
            <div class="card shadow-lg">
            <div class="card-body">
                <center>
                    NO ANNOUNCEMENT IS POSTED YET !
                </center>
            </div>
            </div>
            ';
        }
        else{
            $getdata->execute();
            while($row=$getdata->fetch()){
                $output .='
                <div class="card bg-light mb-3 shadow-lg"">
                <div class="card-header">'.$row['ann_time'] .'</div>
                <div class="card-body">
                    <p class="card-text">'.$row['ann_post'].'</p>
                </div>
                </div>
                ';
            }
        }
    }
    catch(PDOException $e){

    }
    echo json_encode($output);
?>