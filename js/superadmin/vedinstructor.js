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
        //this will get the instructor table
        $.ajax({
          url: '../server/superadminportal/getinstructordata.php',
          type: 'post',
          dataType: 'json',
          success: function(data){
            $("#instructortable").html(data);
          }
        });
        //this will open modal
        $(document).on('click','.editbtn',function(e){
          e.preventDefault();
          id = $(this).attr("id");
          $("#editmodal").modal('show');
          var currentTime = new Date();
          var year = currentTime.getFullYear();
          var next = year + 1;
          var finalyear = year + "-" + next;
          //this will get the course
          $.ajax({
            url: '../server/superadminportal/getcoursecode.php',
            type: 'post',
            data: {'insdept':'insdept',by:finalyear},
            dataType: 'json',
            success: function(data){
              $("#insdept").html(data);
            }
          });
          //this will save edit
          $("#savebtn").click(function(e){
            e.preventDefault();
            if(confirm("DO YOU WANT TO SAVE ?")){
            var insid =  document.getElementById("insid").value;
            var insfname =  document.getElementById("insfname").value;
            var insmname =  document.getElementById("insmname").value;
            var inslname =  document.getElementById("inslname").value;
            var insdept =  document.getElementById("insdept").value;
            $.ajax({
              url: '../server/superadminportal/editinstructor.php',
              type: 'post',
              data: {'edit':'edit',
                      insid:insid,
                      id:id,
                      insfname:insfname,
                      insmname:insmname,
                      inslname:inslname,
                      insdept:insdept},
              dataType: 'json',
              success: function(data){
                if(data.stats == "success"){
                  alert("SAVE SUCCESSFUL!");
                  location.reload();
                }
                else if(data.stats == "exist"){
                  alert("EXISTING INSTRUCTOR !");
                }
                else if(data.stats == "failed"){
                  alert("ERROR 404!");
                }
                else{
                  alert("SYSTEM ERROR! PLEASE TRY AGAIN LATER!");
                }
              }
            });
            }
          });
        });
        //this will delete data
        $(document).on('click','.deletebtn',function(e){
          e.preventDefault();
          if(confirm("ARE YOU SURE YOU WANT TO DELETE?")){
            id = $(this).attr('id');
            $.ajax({
              url: '../server/superadminportal/deleteinstructor.php',
              type: 'post',
              data:{'delete':'delete',id:id},
              dataType:'json',
              success: function(data){
                if(data.stats == "success"){
                  alert("DELETE SUCCESSFUL!");
                  location.reload();
                }
                else{
                  alert("SYSTEM ERROR! PLEASE TRY AGAIN LATER!");
                }
              }
            });
          }
        });
        $("#closebtn").click(function(e){
          document.getElementById("selecttype").value = "";
          document.getElementById("insid").value = "";
          document.getElementById("insfname").value = "";
          document.getElementById("insmname").value = "";
          document.getElementById("inslname").value = "";
          document.getElementById("insdept").value = "";
        })
      });
      function editmode(){
        var select = $("#selecttype").val();
        if(select != ""){
          $.ajax({
            url: '../server/superadminportal/getinstructoredit.php',
            type: 'post',
            data:{'submit':'submit',id:id},
            dataType: 'json',
            success: function(data){
              $("#insid").val(data.insid);
              document.getElementById("insfname").value = data.insfname;
              document.getElementById("insmname").value = data.insmname;
              document.getElementById("inslname").value = data.inslname;
              document.getElementById("insdept").value = data.insdept;
              if(select == "insid"){
                $("#insid").prop("disabled",false);
                $("#insfname").prop("disabled",true);
                $("#insmname").prop("disabled",true);
                $("#inslname").prop("disabled",true);
                $("#insdept").prop("disabled",true);
              }
              else if(select == "insname"){
                $("#insid").prop("disabled",true);
                $("#insfname").prop("disabled",false);
                $("#insmname").prop("disabled",false);
                $("#inslname").prop("disabled",false);
                $("#insdept").prop("disabled",true);
              }
              else if(select == "insdept"){
                $("#insid").prop("disabled",true);
                $("#insfname").prop("disabled",true);
                $("#insmname").prop("disabled",true);
                $("#inslname").prop("disabled",true);
                $("#insdept").prop("disabled",false);
              }
            }
          });
        }
        else{
          $("#insid").val("");
          document.getElementById("insfname").value = "";
          document.getElementById("insmname").value = "";
          document.getElementById("inslname").value = "";
          document.getElementById("insdept").value = "";
          $("#insid").prop("disabled",true);
          $("#insfname").prop("disabled",true);
          $("#insmname").prop("disabled",true);
          $("#inslname").prop("disabled",true);
          $("#insdept").prop("disabled",true);
        }
      }