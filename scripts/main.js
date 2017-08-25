(function(window, document, $) {
    'use strict';
    var D = $(document),
        W = $(window);

    D.ready(function() {
        var nav = $('.navbar-home');
        var body = $('body');

        // Select all links with hashes
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(-2) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

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