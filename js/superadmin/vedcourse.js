var editid = "";
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
            
            // this will get the table
            $.ajax({
                url: "../server/superadminportal/getgradeleveltable.php",
                type: "POST",
                data: {'action':'submit'},
                dataType: 'json',
                success: function(data){
                    $("#coursetable").html(data);
                }
            });
            //THIS WILL DELETE DATA
            $(document).on('click','.btndelete',function(){
              var id = $(this).attr("id");
              if(confirm("DO YOU REALLY WANT TO DELETE THIS?")){
                $.ajax({
                  url: '../server/superadminportal/deletegradelevel.php',
                  type: 'post',
                  data: {'submit':'submit',gradeid:id},
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
              }
            });
            
            //this will open edit modal
            $(document).on('click','.editbtn',function(){
              editid = $(this).attr("id");
              $("#editmodal").modal("show");
              //this will add school year
              var currentTime = new Date();
              var year = currentTime.getFullYear();
              var finalyear = currentTime.getFullYear() - 60;
                  select = document.getElementById("editsy");
              for(var a=year; a > finalyear; a--){
                  for(var b=a+1 ; b > a ; b--){
                      var opt = document.createElement('option');
                      opt.value = a + "-" + b;
                      opt.innerHTML = a + "-" + b;
                      select.appendChild(opt);
                  }
              }
              //this will edit data
              $("#savebtn").click(function(e){
                e.preventDefault();
                var ccode = document.getElementById("editcode").value;
                var cname = document.getElementById("editname").value;
                var cschooly = document.getElementById("editsy").value;
                var cterm = document.getElementById("editterm").value;
                if(ccode == "" && cname == "" && cschooly == "" && cterm == ""){
                  alert("PLEASE COMPLETE THE FORM");
                }
                else{
                  if(confirm("DO YOU WANT TO SAVE?")){
                    $.ajax({
                      url: '../server/superadminportal/editgradelevel.php',
                      type: 'post',
                      data: {'submit':'submit',
                              ccode:ccode,
                              cname:cname,
                              cschooly:cschooly,
                              cterm:cterm,
                              id:editid},
                      dataType: 'json',
                      success: function(data){
                        if(data.stats == "success"){
                          alert("SUCCESSFULLY SAVE!");
                          location.reload();
                        }
                        else if(data.stats == "exist"){
                          alert("EXISTING DATA ! Please try to input other data");
                        }
                        else{
                          alert("SYSTEM ERROR ! PLEASE TRY AGAIN LATER !");
                        }
                      }
                    });
                  }
                }
              });
            });
        });
        function editmode(){
          var select = document.getElementById("selecttype");
          method = select.options[select.selectedIndex].value;
          $.ajax({
            url: "../server/superadminportal/geteditdata.php",
            type: 'POST',
            data: {'submit':'submit',sendid:editid,mode:'editcode'},
            dataType: 'json',
            success: function(data){
              if(method != ""){
                document.getElementById("editcode").value = data.code;
                document.getElementById("editname").value = data.name;
                document.getElementById("editsy").value = data.year;
                document.getElementById("editterm").value = data.term;
                if(method == "cc"){
                  $("#editcode").prop("disabled",false);
                  $("#editname").prop("disabled",true);
                  $("#editsy").prop("disabled",true);
                  $("#editterm").prop("disabled",true);
                }
                else if(method == "cn"){
                  $("#editcode").prop("disabled",true);
                  $("#editname").prop("disabled",false);
                  $("#editsy").prop("disabled",true);
                  $("#editterm").prop("disabled",true);
                }
                else if(method == "csy"){
                  $("#editcode").prop("disabled",true);
                  $("#editname").prop("disabled",true);
                  $("#editsy").prop("disabled",false);
                  $("#editterm").prop("disabled",true);
                }
                else if(method == "ct"){
                  $("#editcode").prop("disabled",true);
                  $("#editname").prop("disabled",true);
                  $("#editsy").prop("disabled",true);
                  $("#editterm").prop("disabled",false);
                }
              }
              else{
                document.getElementById("editcode").value = "";
                document.getElementById("editname").value = "";
                document.getElementById("editsy").value = "";
                document.getElementById("editterm").value = "";
                $("#editcode").prop("disabled",true);
                $("#editname").prop("disabled",true);
                $("#editsy").prop("disabled",true);
                $("#editterm").prop("disabled",true);
              }
            }
          });
        }