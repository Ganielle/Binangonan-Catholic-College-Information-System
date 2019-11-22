var instructorname = "";
      $(document).ready(function(){
        $('#sidebarCollapse').on('click', function() {
          $('#sidebar, #content').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
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
          //this will get the instructor
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
                    instructorname = data;
                    console.log(instructorname);
                }
            });  
            //this will search the grade student
            $("#searchbtn").click(function(e){
              e.preventDefault();
              var sy = document.getElementById("schooly").value;
              var ss = document.getElementById("sem").value;
              var coursecode = document.getElementById("cc").value;
              var subjectcode = document.getElementById("scode").value;
              if(sy == "" && ss == "" && coursecode == "" && subjectcode == ""){
                alert("PLEASE FILL UP THE FORM FIRST !");
              }
              else{
                $.ajax({
                  url: '../server/teacherportal/getstudentgrades.php',
                  type: 'post',
                  data:{'search':'search',
                        sy:sy,
                        ss:ss,
                        coursecode:coursecode,
                        subjectcode:subjectcode},
                  dataType: 'json',
                  success: function(data){
                    $("#mystudentsgrade").html(data);
                  }
                })
              }
            });
      });
      function getsubjectcode(){
        //this will get the subject code
        var schooly = document.getElementById("schooly").value
            term = document.getElementById("sem").value
            course = document.getElementById("cc").value;
        $.ajax({
          url: '../server/teacherportal/getsubjectcode.php',
          type:'post',
          data:{name:instructorname,
                schooly:schooly,
                term:term,
                course:course},
          dataType:'json',
          success: function(data){
            document.getElementById("scode").innerHTML += data;
          }
        });
      }
      function getcoursecode(){
        //this will get the course code
        var schooly = document.getElementById("schooly").value
            term = document.getElementById("sem").value
        $.ajax({
          url: '../server/teacherportal/getcoursecode.php',
          type: 'post',
          data:{'change':'change',name:instructorname,schooly:schooly,term:term},
          dataType: 'json',
          success: function(data){
            document.getElementById("cc").innerHTML = data;
          }
        });
      }