var $=jQuery.noConflict();
$(document).ready(function(){
 
    // main slider -- STARTS HERE
    mainswiper = new Swiper('.main-slider .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: '.main-slider .swiper-button-next',
            prevEl: '.main-slider .swiper-button-prev',
        },
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true
        },
        autoplay: {
            delay: 4000
        }
    });
    // main slider -- ENDS HERE

    // doctor slider -- STARTS HERE
    drswiper = new Swiper('.dr-slider .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        navigation: {
            nextEl: '.dr-slider .swiper-button-next',
            prevEl: '.dr-slider .swiper-button-prev',
        },
        breakpoints: {
            // when window width is <= 480px
            500: {
              slidesPerView: 1
            },
            // when window width is <= 640px
            767: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
          }
    });    
    // doctor slider -- ENDS HERE
    
    // hollywood smile slider -- STARTS HERE
    smileswiper = new Swiper('.hs-slider .swiper-container', {
        slidesPerView: 1,
        loop: false,
        speed: 800,
        allowTouchMove: false,
        pagination: {
            el: '.hs-slider .swiper-pagination',
            clickable: true
        },
        on: {
            init: function () {              
                setTimeout(function(){
                    // hollywood smile before-after picture actions -- STARTS HERE
                    $('.twentytwenty-container').each(function(){
                        $(this).twentytwenty({
                            default_offset_pct: 0.6,
                            no_overlay: true,
                            move_slider_on_hover: true
                        });
                    });
                    $(".swiper-slide-active .container").twentytwenty();
                    // hollywood smile before-after picture actions -- ENDS HERE
                }, 0);
            },
        },
        onSlideChangeStart: function() {
            $('.swiper-slide-active .container').twentytwenty();
            },
        onlyExternal: true
    });
    // hollywood smile slider -- ENDS HERE

     // doctors image hover actions -- STARTS HERE
    var configDr = {
        over: function () { drHover(this) },
        interval: 100,
        out: function () { drLeave(this) }
    }
    //$(".dr-item").hoverIntent(configDr);
    var drHover = function (el) {
        var $this = $(el);
        var $second = $this.find('.hoverr').attr('data-second');
        var $src = $this.find('.hoverr').attr('src');
        if($second != ""){
            $this.find('.hoverr').attr('src', $second);
        }
    }
    var drLeave = function (el) {
        var $this = $(el);
        var $second = $this.find('.hoverr').attr('data-second');
        var $first = $this.find('.hoverr').attr('data-first');
        var $src = $this.find('.hoverr').attr('src');
        if($first != ""){
            $this.find('.hoverr').attr('src', $first);
        }
    }
    // doctors image hover actions -- ENDS HERE

});

(function($){
    $(function(){
        //Sayfa yüklendiğinde twenty pluginini tetikler start
        $(window).on('load',function() {
            $(window).trigger("resize.twentytwenty");
        });
        //Sayfa yüklendiğinde twenty pluginini tetikler end
    })
}(jQuery));