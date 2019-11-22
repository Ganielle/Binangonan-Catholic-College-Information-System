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
      for(var b=a+1; b> a; b--){
    var opt = document.createElement('option');
    opt.value = a+"-"+b;
    opt.innerHTML = a+"-"+b;
    select.appendChild(opt);
  }
}
//this will add student to the subject
$("#savebtn").click(function(e){
  e.preventDefault();
  var schooly = document.getElementById("schooly").value
        course = document.getElementById("coursecode").value;
        subject = document.getElementById("subjectcode").value;
        sem = document.getElementById("semester").value;
        name = document.getElementById("studnumber").value;
        if(schooly == ""){
          alert("PLEASE CHOOSE SCHOOL YEAR");
        }
        else if(subject  == ""){
          alert("PLEASE CHOOSE SUBJECT");
        }
        else if(course  == ""){
          alert("PLEASE CHOOSE COURSE");
        }
        else if(sem == ""){
          alert("PLEASE CHOOSE SCHOOL SEMESTER");
        }
        else if(name == ""){
          alert("PLEASE CHOOSE STUDENT NAME");
        }
        else{
          if(confirm("DO YOU WANT TO SAVE?")){
            $.ajax({
              url: '../server/registrarportal/savestudentsubject.php',
              type: 'post',
              data: {'submit':'submit',
                      schooly:schooly,
                      subject:subject,
                      sem:sem,
                      name:name,
                      course:course},
              dataType: 'json',
              success: function(data){
                if(data.stats == "success"){
                  alert("SUCCESSFULLY SAVE!");
                  location.reload();
                }
                else if(data.stats == "exist"){
                  alert("STUDENT ALREADY ENROLLED TO THE SUBJECT!");
                }
                else if(data.stats == "error"){
                  alert("SYSTEM ERROR !");
                }
              }
            });
          }
        }
})
});
function getcoursecode(){
    //this will get the course code
    var schooly = document.getElementById("schooly").value
        term = document.getElementById("semester").value
    $.ajax({
      url: '../server/registrarportal/getcoursecode.php',
      type: 'post',
      data:{'change':'change',schooly:schooly,term:term},
      dataType: 'json',
      success: function(data){
        document.getElementById("coursecode").innerHTML = data;
      }
    });
  }
  function getsubjectcode(){
    //this will get the subject code
    var schooly = document.getElementById("schooly").value
        term = document.getElementById("semester").value
        course = document.getElementById("coursecode").value;
    $.ajax({
      url: '../server/registrarportal/getsubjectcode.php',
      type:'post',
      data:{schooly:schooly,
            term:term,
            course:course},
      dataType:'json',
      success: function(data){
        document.getElementById("subjectcode").innerHTML = data;
      }
    });
  }
    function getstudentname(){
      var schooly = document.getElementById("schooly").value;
      course = document.getElementById("coursecode").value;
      sem = document.getElementById("semester").value
      $.ajax({
        url: '../server/registrarportal/getstudentnumber.php',
        type:'post',
        data:{'getstud':'getstud',
              schooly:schooly,
              course:course,
              sem:sem},
        dataType: 'json',
        success:function(data){
          $("#studnumber").attr("disabled",false);
          document.getElementById("studnumber").innerHTML = data;
        }
      });
    }