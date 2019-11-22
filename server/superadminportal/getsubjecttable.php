<?php 
    require_once('connection.php');
    $content = "";
        $getsubject = $conn->prepare("SELECT * FROM subject_table ORDER BY sid ASC");
        $getsubject->setFetchMode(PDO::FETCH_ASSOC);
        $getsubject->execute();
        if($getsubject->rowCount() == 0){
          $content .= '
          <div class="card shadow-lg">
          <div class="card-body">
              <center>
                  NO SUBJECT IS CREATED YET!
              </center>
          </div>
          </div>
          ';
        }
        else{
          $content .='
              <table class="table">
              <thead class="thead-dark">
                  <tr>
                      <th scope="col">CODE</th>
                      <th scope="col">SUBJECT DESCRIPTION</th>
                      <th scope="col">PROFESSOR</th>
                      <th scope="col">COURSE CODE</th>
                      <th scope="col">TERM</th>
                      <th scope="col">SCHOOL YEAR</th>
                      <th scope="col">ACTION</th>
                  </tr>
              </thead>
          ';
          while($row=$getsubject->fetch()){
            //content of the table
            $user = $row['sid'];
            $content .='
                <tbody>
                    <th scope="row">'.$row['subject_code'].'</th>
                    <td>'.$row['subject_name'].'</td>
                    <td>'.$row['subject_teacher'].'</td>
                    <td>'.$row['coursecode'].'</td>
                    <td>'.$row['term'].'</td>
                    <td>'.$row['year'].'</td>
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
        }
        $content .='</table>';
    echo json_encode($content);
?>