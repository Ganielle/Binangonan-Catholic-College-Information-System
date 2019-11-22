var id = "";
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
        //this will get subject table
        $.ajax({
          url: '../server/superadminportal/getsubjecttable.php',
          type:'post',
          dataType: 'json',
          success: function(data){
            $("#subjecttable").html(data);
          }
        });
        //this will open the modal
        $(document).on('click','.editbtn',function(){
          id = $(this).attr("id");
          $("#editmodal").modal('show');
          //this will add school year
          var currentTime = new Date();
          var year = currentTime.getFullYear();
          var finalyear = currentTime.getFullYear() - 60;
          select = document.getElementById("subjyear");
          for(var a=year; a > finalyear; a--){
            for(var b=a+1 ; b > a ; b--){
              var opt = document.createElement('option');
              opt.value = a + "-" + b;
              opt.innerHTML = a + "-" + b;
              select.appendChild(opt);
            }
          }
          //this will get the subject course code
          var next = year + 1;
          var finalyear = year + "-" + next;
          $.ajax({
            url: '../server/superadminportal/getcoursecode.php',
            type: 'post',
            data: {'insdept':'insdept',by:finalyear},
            dataType: 'json',
            success: function(data){
              $("#subjccode").html(data);
            }
          });
          //this will get professor
          $.ajax({
            url: '../server/superadminportal/getsubjprof.php',
            type: 'post',
            data:{id:id},
            dataType: 'json',
            success: function(data){
              $("#subjprof").html(data);
            }
          });
        });
        //this will delete table
        $(document).on('click','.deletebtn',function(){
          if(confirm("ARE YOU SURE YOU WANT TO DELETE ?")){
            id = $(this).attr("id");
            $.ajax({
              url: '../server/superadminportal/deletesubject.php',
              type: 'post',
              data: {'submit':'submit',delid:id},
              dataType: 'json',
              success: function(data){
                if(data.stats == "success"){
                  alert("SUCCESSFULLY DELETED!");
                  location.reload();
                }
                else{
                  alet("SYSTEM ERROR ! PLEASE TRY AGAIN LATER!");
                }
              }
            });
          }
        });
        //this will save
        $("#savebtn").click(function(){
          if(confirm("DO YOU WANT TO SAVE?")){
            var select = document.getElementById("selecttype").value;
            var code = document.getElementById("subjcode").value;
            var desc = document.getElementById("subjdesc").value;
            var ccode = document.getElementById("subjccode").value;
            var prof =document.getElementById("subjprof").value;
            var sem = document.getElementById("subjsem").value;
            var year = document.getElementById("subjyear").value;
            if((code != "" && desc != "" && ccode != "" && prof != "" && sem != "" && year != "") || select != ""){
              $.ajax({
                url: '../server/superadminportal/editsubject.php',
                type: 'post',
                data: {'edit':'edit',
                        id:id,
                        code:code,
                        desc:desc,
                        ccode:ccode,
                        prof:prof,
                        sem:sem,
                        year:year},
                dataType: 'json',
                success: function(data){
                  if(data.stats == "success"){
                    alert("SAVE SUCCESSFUL!");
                    location.reload();
                  }
                  else if(data.stats == "existing"){
                    alert("EXISTING DATA!");
                  }
                  else{
                    alert("SYSTEM ERROR! PLEASE TRY AGAIN LATER!");
                  }
                }
              });
            }
            else{
              alert("PLEASE COMPLETE THE FORM FIRST!");
            }
          }
        });
        $("#closebtn").click(function(){
          document.getElementById("selecttype").value = "";
          document.getElementById("subjcode").value = "";
          document.getElementById("subjdesc").value = "";
          document.getElementById("subjccode").value = "";
          document.getElementById("subjprof").value = "";
          document.getElementById("subjsem").value = "";
          document.getElementById("subjyear").value = "";
          $("#subjcode").prop("disabled",true);
          $("#subjdesc").prop("disabled",true);
          $("#subjccode").prop("disabled",true);
          $("#subjprof").prop("disabled",true);
          $("#subjsem").prop("disabled",true);
          $("#subjyear").prop("disabled",true);
        });
      });
      function editmode(){
        var select = document.getElementById("selecttype").value;
        if(select != ""){
          //this will get the data
          $.ajax({
            url: '../server/superadminportal/getsubjedit.php',
            type: 'post',
            data: {id:id},
            dataType: 'json',
            success: function(data){
              document.getElementById("subjcode").value = data.code;
              document.getElementById("subjdesc").value = data.desc;
              document.getElementById("subjccode").value = data.ccode;
              document.getElementById("subjprof").value = data.prof;
              document.getElementById("subjsem").value = data.sem;
              document.getElementById("subjyear").value = data.year;
              if(select == "subjc"){
                $("#subjcode").prop("disabled",false);
                $("#subjdesc").prop("disabled",true);
                $("#subjccode").prop("disabled",true);
                $("#subjprof").prop("disabled",true);
                $("#subjsem").prop("disabled",true);
                $("#subjyear").prop("disabled",true);
              }
              else if(select == "subjd"){
                $("#subjcode").prop("disabled",true);
                $("#subjdesc").prop("disabled",false);
                $("#subjccode").prop("disabled",true);
                $("#subjprof").prop("disabled",true);
                $("#subjsem").prop("disabled",true);
                $("#subjyear").prop("disabled",true);
              }
              else if(select == "subjp"){
                $("#subjcode").prop("disabled",true);
                $("#subjdesc").prop("disabled",true);
                $("#subjccode").prop("disabled",true);
                $("#subjprof").prop("disabled",false);
                $("#subjsem").prop("disabled",true);
                $("#subjyear").prop("disabled",true);
              }
              else if(select == "subjcc"){
                $("#subjcode").prop("disabled",true);
                $("#subjdesc").prop("disabled",true);
                $("#subjccode").prop("disabled",false);
                $("#subjprof").prop("disabled",true);
                $("#subjsem").prop("disabled",true);
                $("#subjyear").prop("disabled",true);
              }
              else if(select == "subjs"){
                $("#subjcode").prop("disabled",true);
                $("#subjdesc").prop("disabled",true);
                $("#subjccode").prop("disabled",true);
                $("#subjprof").prop("disabled",true);
                $("#subjsem").prop("disabled",false);
                $("#subjyear").prop("disabled",true);
              }
              else if(select == "subjsy"){
                $("#subjcode").prop("disabled",true);
                $("#subjdesc").prop("disabled",true);
                $("#subjccode").prop("disabled",true);
                $("#subjprof").prop("disabled",true);
                $("#subjsem").prop("disabled",true);
                $("#subjyear").prop("disabled",false);
              }
            }
          });
        }
        else{
          document.getElementById("subjcode").value = "";
          document.getElementById("subjdesc").value = "";
          document.getElementById("subjccode").value = "";
          document.getElementById("subjprof").value = "";
          document.getElementById("subjsem").value = "";
          document.getElementById("subjyear").value = "";
          $("#subjcode").prop("disabled",true);
          $("#subjdesc").prop("disabled",true);
          $("#subjccode").prop("disabled",true);
          $("#subjprof").prop("disabled",true);
          $("#subjsem").prop("disabled",true);
          $("#subjyear").prop("disabled",true);
        }
      }