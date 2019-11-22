$(document).ready(function() {
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
            var textarea = document.getElementById("announce");
            var val = $(textarea).val()
            var characters = document.getElementById("charactersleft");
        
            $('.expose').click(function(e){
            $(this).css('z-index','99999');
            $('#overlay').fadeIn(300);
            textarea.rows="5";
        
            characters.innerHTML= characters.innerHTML="<font size='1'><p>Characters left: "+400+"</p></font>";
        });
        
        $("#overlay").click(function(e){
            $('#overlay').fadeOut(300, function(){
                $('.expose').css('z-index','1');
                textarea.rows="2";
                characters.innerHTML="";
            });
        });
        
        $('#announce').keyup(function(){
            var characters = document.getElementById("charactersleft");
            var maxchar = 400;
            if (this.value.length > 0){
                characters.innerHTML="<font size='1'><p>Characters left: "+(maxchar - this.value.length)+"</p></font>";
            }
            else{
                characters.innerHTML="<font size='1'><p>Characters left: "+maxchar+"</p></font>";
            }
            $('#wrapper').unbind('click',function(){
                characters.innerHTML="";
            });
        
        });
        //this will post the announcement
        $("#post").click(function(){
            $('#overlay').fadeOut(300, function(e){
                $('.expose').css('z-index','1');
                textarea.rows="2";
                characters.innerHTML="";
            });
            $("#yousure").modal('show');
            $("#save").click(function(e){
                e.preventDefault();
                var postannounce = document.getElementById("announce").value;
                $.ajax({
                    url: "../server/superadminportal/addpost.php",
                    type: 'post',
                    data: {'submit':'submit',posting:postannounce},
                    dataType: 'json',
                    success: function(data){
                        if(data == "success"){
                            alert("Your post successfully saved!");
                            location.reload();
                        }
                        else{
                            alert("SYSTEM ERROR PLEASE TRY AGAIN LATER");
                        }
                    }
                });
            });
        });
        //this will get the post data
        $.ajax({
            url: "../server/superadminportal/getpostdata.php",
            type: 'post',
            dataType: 'json',
            success: function(data){
                $("#announcement").html(data);
            }
        });
        //this will delete post
        $(document).on('click','.btndelete', function(e){
            e.preventDefault();
            var id = $(this).attr('id');
            $("#deletesure").modal('show');
            $("#delete").click(function(e){
                e.preventDefault();
                $.ajax({
                    url: "../server/superadminportal/deletepost.php",
                    type: 'post',
                    data:{'submit':'submit',varid:id},
                    dataType: 'json',
                    success: function(data){
                        if(data.stats == "success"){
                            alert("DELETE SUCCESSFUL!");
                            location.reload();
                        }
                        else{
                            alert("SYSTEM ERROR PLEASE TRY AGAIN LATER OR REFRESH THE PAGE!");
                        }
                    }
                });
            });
        });
        //this will edit the data
        $(document).on('click','.editbtn',function(e){
            e.preventDefault();
            var id = $(this).attr('id');
            $("#editsure").modal('show');
            $("#editpost").click(function(e){
                e.preventDefault();
                var announcedata = document.getElementById("editannounce").value;
                if(confirm("Do you want to edit the announcement?")){
                    $.ajax({
                        url: '../server/superadminportal/editpost.php',
                        type: 'post',
                        data: {'submit':'submit',varid:id,editdata:announcedata},
                        dataType: 'json',
                        success: function(data){
                            if(data.stats == "success"){
                                alert("ANNOUNCEMENT EDIT SUCCESSFULLY !");
                                location.reload();
                            }
                            else if(data.stats == "servererror"){
                                alert("SERVER ERROR ! PLEASE TRY AGAIN OR REFRESH THE PAGE !");
                            }
                        }
                    });
                }
            });
            $("#editclose").click(function(e){
                e.preventDefault()
                var announcedata = document.getElementById("editannounce").value = "";
            });
        });
        });
        function successtext(){
    
            var val = $('#announce').val();
                if(val!== ""){
                    $("#post").attr('disabled',false);
                }
                else{
                    $("#post").attr('disabled',true);
                }
            }