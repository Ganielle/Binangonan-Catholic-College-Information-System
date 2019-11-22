var instructorname;
      var finalgrade = 0;
        $(document).ready(function(){
            $('#sidebarCollapse').on('click', function() {
                $('#sidebar, #content').toggleClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
            function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
                return null;
            }
            var cookie = getCookie("token");
            //this will get the teacher name
            $.ajax({
                url: '../server/teacherportal/getteachername.php',
                type: 'post',
                data: {token:cookie},
                dataType: 'json',
                success:function(data){
                    document.getElementById("teacherfname").value = data;
                    instructorname = data;
                }
            });
            var currentTime = new Date();
            var year = currentTime.getFullYear();
            var finalyear = currentTime.getFullYear() - 60;
            select = document.getElementById("schooly");
            for(var a=year; a > finalyear; a--){
              for(var b=a+1; b > a; b--){
                var opt = document.createElement('option');
                opt.value = a+"-"+b;
                opt.innerHTML = a+"-"+b;
                select.appendChild(opt);
              }
        }
        //this will search
        $("#search").click(function(e){
          e.preventDefault();
          var schooly = document.getElementById("schooly").value
            sem = document.getElementById("semester").value
            course = document.getElementById("coursecode").value;
            name = document.getElementById("teacherfname").value;
            subject = document.getElementById("subjectcode").value;
            term = document.getElementById("term").value;
            studno = document.getElementById("studnumber").value;
            if(schooly != "" && sem != "" && course != "" && name != "" && subject != "" && term != ""){
              $.ajax({
                url: '../server/teacherportal/getstudents.php',
                type: 'post',
                data: {'submit':'submit',
                        schooly:schooly,
                        sem:sem,
                        course:course,
                        name:name,
                        subject:subject,
                        term:term,
                        studno:studno},
                dataType: 'json',
                success: function(data){
                  $("#studentgrades").html(data);
                }
              });
            }
            else{
              alert("PLEASE COMPLETE THE FORM FIRST !");
            }
        });
        var totalgrade = 0.0;
        //this will calculate the grade
        $("#calculate").click(function(){
          var totalstanding = 0.0;
          var totalexam = 0.0;
          var totalnumber = parseInt($("#attendancepercent").val()) + parseInt($("#quizpercent").val()) + 
                                  parseInt($("#assignmentpercent").val()) + parseInt($("#recitactpercent").val());
          if($("#attendance").val() == "" || $("#quiz").val() == "" || $("#assignment").val() == "" || $("#recitact").val() == "" ||
          $("#attendancepercent").val() == "" || $("#quizpercent").val() == "" || $("#assignmentpercent").val() == "" ||
          $("#recitactpercent").val() == "" || $("#exam").val() == ""){
            alert("PLEASE FILL UP THE FORM!");
          }
          else{
            if(totalnumber > 60){
              alert("TOTAL PERCENTAGE FOR CLASS STANDING CANNOT EXCEED 60% !");
            }
            else{
              if(attendance > 100 || quiz > 100 || assignment > 100 || recitact > 100 || exam > 100){
                alert("GRADES CANNOT EXCEED 100");
              }
              else if(attendance < 0 || quiz < 0 || assignment < 0 || recitact < 0 || exam < 100){
                alert("GRADES CANNOT BE LESS THAN 0");
              }
              else{
                var attendance = parseInt($("#attendance").val());
                var quiz = parseInt($("#quiz").val());
                var assignment = parseInt($("#assignment").val());
                var recitact = parseInt($("#recitact").val());
                var exam = parseInt($("#exam").val());
                var attendancepercent = parseInt($("#attendancepercent").val()) / 100;
                var quizpercent = parseInt($("#quizpercent").val()) / 100;
                var assignmentpercent = parseInt($("#assignmentpercent").val()) / 100;
                var recitactpercent =  parseInt($("#recitactpercent").val()) / 100;
                var exampercent = parseInt($("#exampercent").val()) / 100;
                var totalattendance = attendance * attendancepercent;
                var totalquiz = quiz * quizpercent;
                var totalassignment = assignment * assignmentpercent;
                var totalrecitact = recitact * recitactpercent;
                totalstanding = totalattendance + totalquiz + totalassignment + totalrecitact;
                totalexam = exam * exampercent;
                totalgrade = totalstanding + totalexam;
                $("#totalgrade").html(totalgrade);
                $("#savebtn").attr("hidden",false);
              }
            }
          }
        });
        //this will save the grade
        $("#savebtn").click(function(){
          var name = $("#teacherfname").val();
          var sy = $("#schooly").val();
          var sem = $("#semester").val();
          var course = $("#coursecode").val();
          var subject = $("#subjectcode").val();
          var term = $("#term").val();
          var studname = $("#studnumber").val();
          if(name == "" || sy == "" || sem == "" || course == "" || subject == "" || term == "" || studname == "" || totalgrade == 0.0){
            alert("PLEASE COMPLETE THE FORM!");
          }
          else{
            $.ajax({
              url: '../server/teacherportal/savegrade.php',
              type: 'post',
              data: {'submit':'submit',
                      totalgrade:totalgrade,
                      name:name,
                      sy:sy,
                      sem:sem,
                      course:course,
                      subject:subject,
                      term:term,
                      studname:studname},
              dataType: 'json',
              success: function(data){
                if(data.stats == "success"){
                  alert("SAVE SUCCESSFUL!");
                  $("#studnumber").val("");
                  $("#attendance").val("");
                  $("#quiz").val("");
                  $("#assignment").val("");
                  $("#recitact").val("");
                  $("#exam").val("");
                  $("#savebtn").attr("hidden",true);
                  $("#totalgrade").text("");
                  totalgrade=0.0;
                }
                else{
                  alert("SYSTEM ERROR! PLEASE TRY AGAIN LATER");
                  location.reload();
                }
              }
            });
          }
        });
        });
        function getcoursecode(){
        //this will get the course code
        var schooly = document.getElementById("schooly").value
            term = document.getElementById("semester").value
        $.ajax({
          url: '../server/teacherportal/getcoursecode.php',
          type: 'post',
          data:{'change':'change',name:instructorname,schooly:schooly,term:term},
          dataType: 'json',
          success: function(data){
            document.getElementById("coursecode").innerHTML += data;
          }
        });
      }
      function getsubjectcode(){
        //this will get the subject code
        var schooly = document.getElementById("schooly").value
            term = document.getElementById("semester").value
            course = document.getElementById("coursecode").value;
        $.ajax({
          url: '../server/teacherportal/getsubjectcode.php',
          type:'post',
          data:{name:instructorname,
                schooly:schooly,
                term:term,
                course:course},
          dataType:'json',
          success: function(data){
            document.getElementById("subjectcode").innerHTML += data;
          }
        });
      }
      //this will unlock term
      function unlockterm(){
          var schooly = document.getElementById("schooly").value
            term = document.getElementById("semester").value
            course = document.getElementById("coursecode").value;
            name = document.getElementById("teacherfname").value;
            subject = document.getElementById("subjectcode").value;
            if (schooly == "" && term == "" && course == "" && name == "" && subject == ""){
              alert("Please fill up the above inputs before choosing school term!");
              $("#term").attr("disabled",true);
            }
            else{
              $("#term").attr("disabled",false);
            }
        }
        function getstudentname(){
          var schooly = document.getElementById("schooly").value;
          subject = document.getElementById("subjectcode").value;
          sem = document.getElementById("semester").value
          $.ajax({
            url: '../server/teacherportal/getstudentnumber.php',
            type:'post',
            data:{'getstud':'getstud',
                  schooly:schooly,
                  subject:subject,
                  sem:sem},
            dataType: 'json',
            success:function(data){
              $("#studnumber").attr("disabled",false);
              document.getElementById("studnumber").innerHTML = data;
            }
          });
        }
        function getgrades(){
          finalgrade = $(".gradetxt").val();
        }
        function submitgrade(){
          console.log("hi");
          var schooly = document.getElementById("schooly").value
            term = document.getElementById("term").value
            studno = document.getElementById("studnumber").value;
            subject = document.getElementById("subjectcode").value;
            if(confirm("Do you want to save?")){
              $.ajax({
              url: '../server/teacherportal/savegrade.php',
              type:'post',
              data:{'submit':'submit',
                    schooly:schooly,
                    subject:subject,
                    sem:sem,
                    studno:studno,
                    term:term,
                    finalgrade:finalgrade},
              dataType: 'json',
              success:function(data){
                if(data.stats == "success"){
                  alert("SAVE SUCCESSFUL!");
                  $(".gradetxt").attr("disabled",true);
                  $(".submitbtn").attr("disabled",true);
                }
              }
            });
            }
        }