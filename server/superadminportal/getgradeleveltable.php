<?php 
    require_once('connection.php');
    $content = "";
    if(isset($_POST['action']) && $_POST['action'] == 'submit'){
        $getgrade = $conn->prepare("SELECT * FROM gradelevel_table ORDER BY gid ASC");
        $getgrade->setFetchMode(PDO::FETCH_ASSOC);
        $getgrade->execute();
        if($getgrade->rowCount() > 0){
        $content .='
            <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">COURSE CODE</th>
                    <th scope="col">COURSE NAME</th>
                    <th scope="col">COURSE BATCH</th>
                    <th scope="col">NO. OF STUDENTS</th>
                    <th scope="col">COURSE TERM</th>
                    <th scope="col">ACTION</th>
                </tr>
            </thead>
        ';

        while($row=$getgrade->fetch()){
        //content of the table
        $user = $row['gid'];
        $gettable = $row['level_code'].$row['level_yearbatch'].$row['level_term']."_table";
        $count = $conn->prepare("SELECT student_id FROM `$gettable`");
        $count->setFetchMode(PDO::FETCH_ASSOC);
        $count->execute();
        $content .='
            <tbody>
                <th scope="row">'.$row['level_code'].'</th>
                <td>'.$row['level_name'].'</td>
                <td>'.$row['level_yearbatch'].'</td>
                ';
                if($count->rowCount() == 0){
                  $content .='<td>0</td>';
                }
                else{
                  while($row2=$count->fetch()){
                    $content .='<td>'.$count->rowCount().'</td>';
                  }
                }
                $content .= '<td>'.$row['level_term'].'</td>
                <td>
                <div class="row">
                        <div class="col-xs-4 col-md-4 thumb">
                        <button type="button" class="editbtn btn btn-info" id="'.$user.'">Edit</button>
                        </div>
                        <div class="col-xs-4 col-md-4 thumb" id="btndelete">
                        <button type="button" class="deletebtn btn btn-info" id="'.$user.'">Delete</button>
                        </div>
                        </div>
                </td>
            </tbody>
        ';
        }
        $content .='</table>';
      }
      else{
        $content .= '
            <div class="card shadow-lg">
            <div class="card-body">
                <center>
                    NO COURSE IS YET CREATED !
                </center>
            </div>
            </div>

            ';
      }
    }
    else{
        $content = "THERE WAS AN ERROR IN SYSTEM" ;
    }
    
    echo json_encode($content);
?>