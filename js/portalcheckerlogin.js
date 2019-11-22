$(document).ready(function(){
  //this will execute login
  $("#login").click(function(e){
      var uname = document.getElementById("usernameinput").value;
          pass = document.getElementById("passwordinput").value;
      if(uname == ""){
          alert("Please input your valid username");
      }
      else if(pass == ""){
          alert("Please input your valid password");
      }
      else{
          $.ajax({
              url: 'server/login.php',
              type: 'post',
              data: {'submit':'submit',uname:uname,pass:pass},
              dataType: 'json',
              success: function(data){
                  if(data.stats == "SUPER ADMIN"){
                      window.open("superadminportal/superadminhome.html","_self");
                  }
                  else if(data.stats == "INSTRUCTOR"){
                      window.open("teacherportal/teacherhome.html","_self");
                  }
                  else if(data.stats == "STUDENT"){
                      window.open("studentportal/studenthome.html","_self");
                  }
                  else if(data.stats == "REGISTRAR"){
                      window.open("registrarportal/registrarhome.html","_self");
                  }
                  else if(data.stats == "notexist"){
                      alert("USERNAME OR PASSWORD IS WRONG! PLEASE TRY AGAIN!");
                  }
                  else{
                      alert("SYSTEM ERROR! PLEASE TRY AGAIN LATER!");
                  }
              }
          });
      }
  });
  //get cookie
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
  console.log(cookie);
  $.ajax({
      url: 'server/portalchecker.php',
      type: 'post',
      data: {token:cookie},
      dataType: 'json',
      success: function(data){
          if(data.stats == "SUPER ADMIN"){
                      window.open("superadminportal/superadminhome.html","_self");
                  }
                  else if(data.stats == "INSTRUCTOR"){
                      window.open("teacherportal/teacherhome.html","_self");
                  }
                  else if(data.stats == "STUDENT"){
                      window.open("superadminportal/superadminhome.html","_self");
                  }
                  else if(data.stats == "REGISTRAR"){
                      window.open("registrarportal/registrarhome.html","_self");
                  }
      }
  });
});