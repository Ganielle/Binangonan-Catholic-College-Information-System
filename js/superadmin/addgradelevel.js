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
    $("#breadcrumbhome").click(function(e){
        e.preventDefault()
        window.open("../superadminportal/superadminhome.html","_self");
    });
    $("#homeis").click(function(e){
        e.preventDefault();
        window.open("../superadminportal/superadminhome.html","_self");
    });
    //this will add batch year
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var finalyear = currentTime.getFullYear() - 60;
    var nextyear = year + 1;
        select = document.getElementById("gradelevelbatch");
        editselect = document.getElementById("editgradelevel");
    for(var a=year; a > finalyear; a--){
        for(var b=a+1; b > a ; b--){
            var opt = document.createElement('option');
            opt.value = a+"-"+b;
            opt.innerHTML = a +"-"+b;
            select.appendChild(opt);
        }
    }
    for(var a=year; a > finalyear; a--){
        var opt = document.createElement('option');
        opt.value = a;
        opt.innerHTML = a;
        editselect.appendChild(opt);
    }
    select.value = new Date().getFullYear();
    //this will add grade level
        $("#savegrade").click(function(e){
            e.preventDefault();
            if(document.getElementById("levelcode").value != "" &&  document.getElementById("levelname").value != ""){  
                $("#yousure").modal('show');
            }
            else{
                if(document.getElementById("levelcode").value == ""){
                    alert("Please input level code!");
                }
                else if(document.getElementById("levelname").value == ""){
                    alert("Please input level name!");
                }
                else{
                    alert("error in system");
                }
            }
        });
        $("#save").click(function(e){
            e.preventDefault();
            var getbatch = document.getElementById("gradelevelbatch");
            var batch = getbatch.options[getbatch.selectedIndex].value;
            var getterm = document.getElementById("termbatch");
            var term = getterm.options[getterm.selectedIndex].value;
            var code = $('#levelcode').val();
            var name = $('#levelname').val();
            $.ajax({
                url: "../server/superadminportal/addgradelevel.php",
                type: "POST",
                data: {'submit':'submit',lvlcode:code,lvlname:name,lvlbatch:batch,lvlterm:term},
                dataType: 'json',
                success: function(data){
                    console.log("hi");
                    if(data.stats == "success"){
                        $("#yousure").modal('toggle');
                        alert("SUCCESSFULLY SAVE!");
                        location.reload();
                    }
                    else if(data.stats == "exist"){
                        $("#yousure").modal('toggle');
                        alert("EXISTING SECTION! PLEASE CREATE OTHER SECTION");
                    }
                    else if(data.stats == "error"){
                        $("#yousure").modal('toggle');
                        alert("PLEASE COMPLETE THE FIELDS");
                    }
                    else if(data.stats == "systemerror"){
                        $("#yousure").modal('toggle');
                        alert("THERE WAS AN ERROR IN SYSTEM, PLEASE TRY AGAIN LATER!");
                        location.reload();
                    }
                } 
            });
        });
});