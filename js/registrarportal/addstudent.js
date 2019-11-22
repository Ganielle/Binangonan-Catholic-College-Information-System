$(document).ready(function(){
    $('#sidebarCollapse').on('click', function() {
            $('#sidebar, #content').toggleClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
        //this will get the course dropdown
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        var next = year + 1;
        $.ajax({
            url: '../server/registrarportal/getcoursedropdown.php',
            type: 'post',
            data: {time:year+"-"+next},
            dataType: 'json',
            success: function(data){
                $("#course").html(data);
            }
        });
        document.getElementById("schooly").value = year + "-" + next;
        //this will add data
        $("#submitform").click(function(e){ 
            e.preventDefault();
            var studno = document.getElementById("studentno").value;
            var given = document.getElementById("fname").value;
            var mname = document.getElementById("mname").value;
            var lname = document.getElementById("lname").value;
            var course = document.getElementById("course").value;
            var sem = document.getElementById("semester").value;
            var schooly = document.getElementById("schooly").value;
            var uname = document.getElementById("uname").value;
            var pass = document.getElementById("pass").value;
            if(studno == ""){
                alert("Please enter your student number!");
            }
            else if(given == ""){
                alert("Please enter your given name!");
            }
            else if(mname == ""){
              alert("Please enter your given middle name!");
          }
          else if(lname == ""){
            alert("Please enter your given last name!");
        }
            else if(course == "" || course == "THERES NO EXISTING COURSE FOR THIS SCHOOL YEAR!"){
                alert("Please choose your course!");
            }
            else if(sem == ""){
                alert("Please choose your semester");
            }
            else if(schooly == ""){
                alert("SYSTEM ERROR");
            }
            else if(uname == ""){
                alert("PLEASE INPUT YOUR USERNAME");
            }
            else if(pass == ""){
                alert("PLEASE ENTER YOUR PASSWORD");
            }
            else{
            if(confirm("DO YOU WANT TO SAVE YOUR INFORMATION?")){
                $.ajax({
                    url: '../server/registrarportal/addstudent.php',
                    type: 'post',
                    data: {'submit':'submit',
                            studno:studno,
                            given:given,
                            mname:mname,
                            lname:lname,
                            course:course,
                            sem:sem,
                            schooly:schooly,
                            uname:uname,
                            pass:pass},
                    dataType: 'json',
                    success: function(data){
                    if(data.stats == "success"){
                        alert("SUCCESSFULLY SAVE!");
                        location.reload();
                    }
                    else if(data.stats == "error"){
                        alert("TABLE DON'T EXIST! Please talk to the administrator about the problem!");
                    }
                    else if(data.stats == "existing"){
                        alert("EXISTING STUDENT! PLEASE ENTER DIFFERENT STUDENT!");
                    }
                    else if(data.stats == "systemerror"){
                        alert("SYSTEM ERROR ! PLEASE TRY AGAIN LATER");
                    }
                    else{
                        alert("Please fill up the form before saving !");
                    }
                    }
                });
                }
            }
        });
});