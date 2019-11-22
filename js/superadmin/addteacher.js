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
    //this will add teacher to the system
    $("#saveteacher").click(function(e){
        e.preventDefault();
        var tid = document.getElementById("tid").value;
            given = document.getElementById("givenname").value;
            mname = $("#mname").val();
            surnmae = $("#surname").val();
            uname = document.getElementById("uname").value;
            pass = document.getElementById("pass").value;
            cc = $("#coursecode").val();
        if(tid == ""){
            alert("PLEASE INPUT TEACHER ID FIRST!");
        }
        else if(given == ""){
            alert("PLEASE INPUT GIVEN NAME FIRST!");
        }
        else if(mname == ""){
          alert("PLEASE INPUT MIDDLE NAME!");
        }
        else if(given == ""){
          alert("PLEASE INPUT SURNAME FIRST!");
        }
        else{
            $("#yousure").modal('show');
            $("#save").click(function(){
                $.ajax({
                url: "../server/superadminportal/addteacher.php",
                type: 'post',
                data: {'submit':'submit',
                        id:tid,
                        given:given,
                        mname:mname,
                        surname:surname,
                        coursecode:cc,
                        uname:uname,
                        pass:pass},
                dataType: 'json',
                success: function(data){
                    if(data.stats == "success"){
                        alert("SUCCESSFULLY SAVE");
                        location.reload();
                    }
                    else if(data.stats == "error"){
                        alert("SYSTEM ERROR PLEASE TRY AGAIN LATER!");
                    }
                    else if(data.stats == "incomplete"){
                        alert("PLEASE INPUT TEACHER ID AND NAME FIRST!");
                    }
                    else if(data.stats == "exist"){
                        alert("TEACHER EXIST!");
                    }
                }
                });
            });                    
        }                
    });
    //this will delete teacher
    $(document).on('click','.deletebtn',function(e){
        e.preventDefault();
        if(confirm("Are you sure you want to delete?")){
            var id = $(this).attr("id");
            $.ajax({
                url: '',
                type: 'post',
                data: {'submit':'submit',id:id},
                dataType: 'json',
                success: function(data){
                    
                }
            });
        }
    });
    //this will get the coursecode
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var next = year + 1;
    var schooly = year + "-" + next;
    $.ajax({
      url: '../server/superadminportal/getteachercoursecode.php',
      type: 'post',
      data: {schoolyear:schooly},
      dataType: 'json',
      success: function(data){
        $("#coursecode").html(data);
      }
    });
});