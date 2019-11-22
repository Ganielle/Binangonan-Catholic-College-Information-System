$(document).ready(function(){
    window.sr = ScrollReveal();

    sr.reveal('.jumbotronscrolled',{
		duration: 2000,
		origin: 'bottom',
		distance: '50px'
    });
    sr.reveal('#bcclogo',{
		duration: 2000,
		origin: 'bottom',
        distance: '50px',
        delay: 300
    });
    sr.reveal('#bccname',{
		duration: 2000,
		origin: 'bottom',
        distance: '50px',
        delay: 400
    });
    sr.reveal('#usernameinput',{
		duration: 2000,
		origin: 'bottom',
        distance: '50px',
        delay: 500
    });
    sr.reveal('#usernamepic',{
		duration: 2000,
		origin: 'bottom',
        distance: '50px',
        delay: 500
    });
    sr.reveal('#passwordinput',{
		duration: 2000,
		origin: 'bottom',
        distance: '50px',
        delay: 600
    });
    sr.reveal('#passwordpic',{
		duration: 2000,
		origin: 'bottom',
        distance: '50px',
        delay: 600
    });
    sr.reveal('#login',{
		duration: 2000,
		origin: 'bottom',
        distance: '50px',
        delay: 700
	});
});