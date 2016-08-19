$(function() {
    $('#side-menu').metisMenu();
    $('[data-toggle="tooltip"]').tooltip();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        let topOffset = 50;
        let width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        let $nav = $('nav.navbar');
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            $nav.removeClass('navbar-fixed-top');
            $nav.addClass('navbar-static-top');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
            $nav.removeClass('navbar-static-top');
            $nav.addClass('navbar-fixed-top');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    window.onload = function(event) {
      setTimeout(function(){
        let width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        let $nav = $('nav.navbar');
        if (width < 768) {
            $nav.removeClass('navbar-fixed-top');
            $nav.addClass('navbar-static-top');
        } else {
            $nav.removeClass('navbar-static-top');
            $nav.addClass('navbar-fixed-top');
        }
      },200);
    };
    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});
