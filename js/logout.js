$(document).ready(function(){
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

$("#logout").click(function(e){
    e.preventDefault();
    $.ajax({
        url: '../server/logout.php',
        type: 'POST',
        data:{'logout':'logout',token:cookie},
        dataType: 'json',
        success: function(data){
            if(data.stats == "loggingout"){
                window.open("../mainpc.html","_self");
            }
        }
    });
});
});