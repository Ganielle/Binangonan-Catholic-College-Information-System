$(document).ready(function(){
    $("#coursebtn").click(function(e){
      e.preventDefault();
      $("#subjectbtn").attr("aria-expanded","false");
      $("#addingsubject").attr("class","collapse");
      $("#teacherbtn").attr("aria-expanded","false");
      $("#addingteacher").attr("class","collapse");
  });
  $("#subjectbtn").click(function(e){
      e.preventDefault();
      $("#coursebtn").attr("aria-expanded","false");
      $("#addcourse").attr("class","collapse");
      $("#teacherbtn").attr("aria-expanded","false");
      $("#addingteacher").attr("class","collapse");
  });
  $("#teacherbtn").click(function(e){
      e.preventDefault();
      $("#coursebtn").attr("aria-expanded","false");
      $("#addcourse").attr("class","collapse");
      $("#subjectbtn").attr("aria-expanded","false");
      $("#addingsubject").attr("class","collapse");
  });
    $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
});
var schooly = document.getElementById("gradelevelbatch").value;
            term = document.getElementById("termbatch").value;
            $.ajax({
                url: '../server/superadminportal/getcoursecode.php',
                type: 'post',
                data: {'change':'change',
                        term:term,
                        schooly:schooly},
                dataType: 'json',
                success: function(data){
                    $("#coursecode").html(data);
                }
            });
    //this will get the teacher names
    $.ajax({
        url: '../server/superadminportal/getteacherdropbox.php',
        type: 'post',
        dataType: 'json',
        success: function(data){
            $("#tfname").html(data);
        }
    });
    //this will add school year
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var finalyear = currentTime.getFullYear() - 60;
        select = document.getElementById("gradelevelbatch");
    for(var a=year; a > finalyear; a--){
        for(var b=a+1 ; b > a ; b--){
            var opt = document.createElement('option');
            opt.value = a + "-" + b;
            opt.innerHTML = a + "-" + b;
            select.appendChild(opt);
        }
    }
    //this will save the subject
    $("#savegrade").click(function(e){
        e.preventDefault();
        var subject = document.getElementById("subjectn").value;
            code = document.getElementById("sid").value;
            teacher = document.getElementById("tfname").value;
            year = document.getElementById("gradelevelbatch").value;
            term = document.getElementById("termbatch").value;
            course = document.getElementById("coursecode").value;
        if(code == ""){
            alert("Please enter subject code first and try again!");
        }
        else if(subject == ""){
            alert("Please enter subject name first and try again!");
        }
        else if(teacher == ""){
            alert("Please enter subject professor first and try again!");
        }
        else{
            $("#yousure").modal('show');
            $("#save").click(function(e){
                $.ajax({
                url: '../server/superadminportal/addsubject.php',
                type: 'post',
                data: {'submit':'submit',
                        subc:code,
                        subn:subject,
                        subprof:teacher,
                        syear:year,
                        lvlterm:term,
                        coursecode:course},
                dataType: 'json',
                success: function(data){
                        if(data.stats == "existing"){
                            alert("SUBJECT ALREADY EXISTED!");
                        }
                        else if(data.stats == "errorcode"){
                            alert("Please enter subject code first and try again!");
                        }
                        else if(data.stats == "errorname"){
                            alert("Please enter subject name first and try again!");
                        }
                        else if(data.stats == "errorprof"){
                            alert("Please enter subject name first and try again!");
                        }
                        else if(data.stats == "added"){
                            alert("SAVE SUCCESSFUL !");
                            location.reload();
                        }
                    }
                });
            });
        }
    });
    //this will delete the record
    $(document).on('click','.btndelete',function(){
        var id = $(this).attr("id");
        $("#deletesure").modal('show');
        $("#delete").click(function(e){
            $.ajax({
                url: "../server/superadminportal/deletesubject.php",
                type: 'post',
                data: {'submit':'submit',delid:id},
                dataType: 'json',
                success: function(data){
                    if(data.stats == "success"){
                        alert("SUCCESSFULLY DELETED!");
                        location.reload();
                    }
                    else{
                        alert("SYSTEM ERROR! PLEASE TRY AGAIN LATER!");
                    }
                }
            });
        });
    });
});
function changeschooly(){
    var schooly = document.getElementById("gradelevelbatch").value;
        subject = document.getElementById("subjectn").value;
        code = document.getElementById("sid").value;
        teacher = document.getElementById("tfname").value;
        term = document.getElementById("termbatch").value;
        $.ajax({
            url: '../server/superadminportal/countcoursecode.php',
            type: 'post',
            data: {'change':'change',
                    term:term,
                    schooly:schooly},
            dataType: 'json',
            success: function(data){
            if(data.stats == "exist"){
                $.ajax({
                url: '../server/superadminportal/getcoursecode.php',
                type: 'post',
                    data: {'change':'change',
                        term:term,
                        schooly:schooly},
                    dataType: 'json',
                    success: function(datahtml){
                    $("#coursecode").html(datahtml);
                    }
                });
                }
                else if(data.stats == "notexist"){
                    alert("COURSE CODE LIST DOESN'T EXIST");
                    $("#coursecode").val("");
                    $("#gradelevelbatch").val("");
                }
                else if(data.stats == "systemerror"){
                    alert("SYSTEM ERROR");
                    $("#coursecode").html("");
                    $("#gradelevelbatch").val("");
                }
            }
        });
}