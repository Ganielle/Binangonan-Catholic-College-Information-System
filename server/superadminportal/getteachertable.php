<?php 
    require_once('connection.php');
    $content = "";
    $getteacher = $conn->prepare("SELECT * FROM teacher_table ORDER BY tid ASC");
        $getteacher->setFetchMode(PDO::FETCH_ASSOC);
        $getteacher->execute();
        $content .='
            <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">FULL NAME</th>
                    <th scope="col">ACTION</th>
                </tr>
            </thead>
        ';

        while($row=$getteacher->fetch()){
        //content of the table
        $user = $row['tid'];
        $content .='
            <tbody>
                <th scope="row">'.$row['teacher_id'].'</th>
                <td>'.$row['teacher_name'].'</td>
                <td>
                    <div class="row">
                    <div class="col-xs-4 col-md-4 thumb">
                    <button type="button" class="editbtn btn btn-info" id="'.$user.'">Edit</button>
                    </div>
                    <div class="col-xs-4 col-md-4 thumb" id="btndelete">
                    <button type="button" class="btndelete btn btn-info" id="'.$user.'">Delete</button>
                    </div>
                    </div>
                </td>
            </tbody>
        ';
        }
        $content .='</table>';
    echo json_encode($content);
?>