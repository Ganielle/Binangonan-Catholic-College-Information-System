$(document).ready(function(){
  $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
  //this will get the announcement
  $.ajax({
      url: '../server/teacherportal/getannouncement.php',
      type: 'post',
      dataType: 'json',
      success: function(data){
          $("#announcement").html(data);
      }
  });
});