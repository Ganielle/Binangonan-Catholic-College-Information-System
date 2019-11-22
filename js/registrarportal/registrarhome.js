$(document).ready(function(){
        $('#sidebarCollapse').on('click', function() {
                $('#sidebar, #content').toggleClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
            //this will get all the announcement data
            $.ajax({
                url: '../server/registrarportal/getannouncement.php',
                type: 'post',
                dataType: 'json',
                success: function(data){
                    $("#announcements").html(data);
                }
            });
    });