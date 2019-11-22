$(document).ready(function(){
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
    $.ajax({
        url: '../server/portalchecker.php',
        type: 'POST',
        data:{'logout':'logout',token:cookie},
        dataType: 'json',
        success: function(data){
            if(data.stats == "INSTRUCTOR"){
                window.open("../teacherportal/teacherhome.html","_self");
            }
            else if(data.stats == "STUDENT"){
                window.open("../studentportal/studenthome.html","_self");
            }
            else if(data.stats == "SUPER ADMIN"){
                window.open("../superadminportal/superadminhome.html","_self");
            }
            else if(data.stats == "notsignin"){
                window.open("../mainpc.html","_self");
            }
        }
    });
});