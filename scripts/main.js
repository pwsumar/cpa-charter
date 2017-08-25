(function(window, document, $) {
    'use strict';
    var D = $(document),
        W = $(window);

    D.ready(function() {
        var nav = $('.navbar-home');
        var body = $('body');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 62) {
                body.addClass("body-fixed-nav");
                nav.addClass("navbar-fixed-top");
            } else {
                body.removeClass("body-fixed-nav");
                nav.removeClass("navbar-fixed-top");
            }
        });

        $(".navbar-toggle").click(function() {
            $(this).toggleClass("active");
            $('body').toggleClass("cbp-spmenu-push-toleft");
            $('.mobile-nav').toggleClass("cbp-spmenu-open");
        });

        $(".close-menu").click(function() {
            $('.navbar-toggle').removeClass("active");
            $('body').removeClass("cbp-spmenu-push-toleft");
            $('.mobile-nav').removeClass("cbp-spmenu-open");
        });
    });


    W.load(function() { // makes sure the whole site is loaded
        $('body').addClass('is__in');
    });

    // Dropdown toggle
    $('#menu-mobile .menu-toggle').on('click', function(){
        $(this).closest('li').find('.dropdown-menu').toggle();
    });

    $(document).click(function(e) {
        var target = e.target;
        if (!$(target).is('.menu-toggle') && !$(target).parents().is('.menu-toggle')) {
            $('.dropdown-menu').hide();
        }
    });

})(window, document, jQuery);

//HEIGHT SAME
equalheight = function(container){
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$(window).load(function() {
    equalheight('.grid-section .col-md-6');
    equalheight('.grid-bottom .grid-height .grid-border');
    equalheight('.content-expertise .expert-holder .expert-header');
});

$(window).resize(function(){
    equalheight('.grid-section .col-md-6');
    equalheight('.grid-bottom .grid-height .grid-border');
    equalheight('.content-expertise .expert-holder .expert-header');
});