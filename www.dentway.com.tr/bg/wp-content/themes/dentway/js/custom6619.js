var $=jQuery.noConflict(); 
$(document).ready(function(){ 
    if($('html').attr("lang") == "en-US"){
        var engnav = '<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1475"><a href="https://www.dentway.com.tr/eng1/?page_id=1475">Implant Treatment</a></li>';
        var _clone = $('#menu-item-2509').clone();
        $('#menu-item-2509').remove();
        $('#primary-menu').append(engnav + _clone[0].outerHTML);
    }

    // Scroll asagidaysa sticky yap
    if ($(this).scrollTop() > 160 && !$('#masthead').hasClass('sticky')) {
        $('#masthead, #search, #content, .nav-overlay, .nav-wrapper').addClass('sticky');
    }

    // navigation actions -- STARTS HERE
    $('body').on('click', '.menu-toggle', function(){
        var $this = $(this);
        if(!$this.hasClass('is-active')){
            $this.addClass('is-active');
            $this.find('.text').text($this.find('.text').attr('data-activeText'));
            if(deviceCheck() == "desktop"){
                $('html, body').removeClass('overflow-hidden');
                $('#primary-menu').stop(true, true).slideDown();
                $('.nav-overlay').stop(true, true).slideDown();
            }
            else {
                $('html, body').addClass('overflow-hidden');
                $('#primary-menu').addClass('is-active');
            }
        }
        else {
            $this.removeClass('is-active');
            $this.find('.text').text($this.find('.text').attr('data-text'));
            if(deviceCheck() == "desktop"){
                $('#primary-menu').stop(true, true).slideUp();
                $('.nav-overlay').stop(true, true).slideUp(); 
                $('html, body').removeClass('overflow-hidden');

            }
            else { 
                $('html, body').removeClass('overflow-hidden');
                $('#primary-menu').removeClass('is-active');
            }
        }
        if($('.h-search').hasClass('is-active')) {
            $('.h-search').removeClass('is-active');
            $('#search').stop(true, true).slideUp();
        }
    });
    // navigation actions -- ENDS HERE

    // search actions -- STARTS HERE
    $('body').on('click', '.h-search', function(){
        var $this = $(this);
        if($this.hasClass('is-active')){
            $this.removeClass('is-active');
            $('#search').stop(true, true).slideUp();
        }
        else {
            $this.addClass('is-active');
            $('#search').stop(true, true).slideDown();
        }
        if($('.menu-toggle').hasClass('is-active')) {
            $('.menu-toggle').removeClass('is-active');
            if(deviceCheck() == "desktop"){ 
                $('#primary-menu').stop(true, true).slideUp();
                $('.nav-overlay').stop(true, true).slideUp();
            }
            else {
                $('#primary-menu').removeClass('is-active');
            }
            

           
        }
    });
    // search actions -- ENDS HERE

    $('body').on('keydown', function(event){
        if(event.which === 27 && ($('.h-search').hasClass('is-active') || $('.menu-toggle').hasClass('is-active'))){
            $('.h-search, .menu-toggle').removeClass('is-active');
            $('#search, .nav-overlay, #primary-menu').stop(true, true).slideUp();
            $('html, body').removeClass('overflow-hidden');            
            $('.menu-toggle').find('.text').text($('.menu-toggle').find('.text').attr('data-text'));
        }
    });

    $('body').on('click', '.menu-item-has-children > a', function (e) {
        if($('body').hasClass('mobile')){
            e.preventDefault();
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(this).next('.sub-menu').stop(true, true).slideUp('fast');
            }
            else {
                $(this).addClass('active');
                $(this).next('.sub-menu').stop(true, true).slideDown('fast');
                
                $('.menu-item-has-children > a').not($(this)).removeClass('active');
                $('.menu-item-has-children > a[href^="https"]').next('.sub-menu').not($(this).next('.sub-menu')).stop(true, true).slideUp('fast');
            }            
            return false;
        }
    });

    $('body').on('click', '.nav-overlay', function () {
        $('.menu-toggle').removeClass('is-active');

        if(deviceCheck() == "desktop"){
            $('.nav-overlay').stop(true, true).slideUp();
            $('#primary-menu').stop(true, true).slideUp();
        }
        else {
            $('#primary-menu').removeClass('is-active');
        }
        
    });

    // page down target -- STARTSS HERE
    $('body').on('click', '.page-down-btn', function(){
        var _offset = $('.page-down-target').offset().top;
        slideTop(_offset - 30); 
    });
    // page down target -- ENDS HERE

    // instagram slider -- STARTS HERE
    if($('.instagram .insta-item').length > 1){
        instaswiper = new Swiper('.instagram .swiper-container', {
            slidesPerView: 5,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            navigation: {
                nextEl: '.instagram .swiper-button-next',
                prevEl: '.instagram .swiper-button-prev',
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
    }
    // instagram slider -- ENDS HERE

    // accordion actions
    //animateRipple($this, e);
    $('body').on('click', '.acc-title', function(){
        var $this = $(this);
        if($this.hasClass('active')){
            $this.next('.acc-content').stop(true, true).slideUp();
            $this.removeClass('active');
        }
        else {
            $this.parents('.accordion').find('.acc-title').not($this).removeClass('active');
            $this.parents('.accordion').find('.acc-content').not($this.next()).slideUp('1');
            $this.next('.acc-content').stop(true, true).slideDown('slow', function(){
                var _offset = $this.offset().top;
                $("html, body").animate({
                    scrollTop: _offset - $('#masthead').height() - 20
                });
            });
            $this.addClass('active');            
        }
        
    });
    
    // accordion actions -- ENDS HERE
    
    
    // accordion all items -- STARTS HERE
    $('body').on('click', '.accordion .acc-all', function(){
        var $this = $(this);
        var $text = $this.attr('data-text');
        var $activetext = $this.attr('data-activetext');
        if($this.hasClass('active')){
            $this.removeClass('active').text($text);
            $this.parents('.accordion').find('.acc-item:nth-child(3) ~ .acc-item').stop(true, true).slideUp();
        }
        else {
            $this.addClass('active').text($activetext);
            $this.parents('.accordion').find('.acc-item:nth-child(3) ~ .acc-item').stop(true, true).slideDown();
        }
    });
    // accordion all items -- ENDS HERE

    // anlasmali kurumlar -- STARTS HERE
    $('body').on('click', '.all-brands', function () {
        var $this = $(this);
        var $text = $this.attr('data-text');
        var $activetext = $this.attr('data-activetext');
        if($this.hasClass('active')){
            $this.removeClass('active').text($text);
            $('.contracted-institutions').find('div:nth-child(9) ~ div').stop(true, true).slideUp();
            
        }
        else {
            $this.addClass('active').text($activetext);
            $('.contracted-institutions').find('div:nth-child(9) ~ div').stop(true, true).slideDown();
        }
    });
    // anlasmali kurumlar -- ENDS HERE

    // basinda dentway -- STARTS HERE
    $('body').on('click', '.press-tab a', function(){
        var $this = $(this),
            $target = $this.attr('data-target');
            if(!$this.hasClass('active')){
                $('.press-tab a.active').removeClass('active');
                $this.addClass('active');

                if($target == "all"){ 
                    $('.press-list').removeClass('television newspaper magazine');
                    $('.press-list > div').show(); 
                }
                else{
                    $('.press-list').removeClass('television newspaper magazine');
                    $('.press-list').addClass($target);
                    $('.press-list > div').each(function () {
                        var _this = $(this),
                            _target = _this.attr('data-content');
                        _this.hide();
                        if(_target == $target){
                            _this.show();
                        }
                    });
                }
            }
    });

    if($('.press-list').length > 0){
        var $pressHeight = $('.press-list')[0].getBoundingClientRect().height + 20;
        var _height=$('.press-list > div')[0].getBoundingClientRect().height * 3 + (45 * 3) + 15;
        $('.press-list').height(_height).animate({height: _height}, 1000);
    }
    $('body').on('click', '.all-press', function () {
        var $this = $(this),
            $text = $this.attr('data-text'),
            $activetext = $this.attr('data-activetext');

        if($this.hasClass('active')){
            $this.removeClass('active').text($text);  
            $('.press-list').height(_height).animate({height: _height}, 1000);
            slideTop(0);
        }
        else {
            $this.addClass('active').text($activetext); 
            $('.press-list').height($pressHeight).animate({height: $pressHeight}, 1000); 
        }
    });
    // basinda dentway -- ENDS HERE

    // fancybox -- STARTS HERE
    $('[data-fancybox]').fancybox({
        lang: "tr",
        i18n: {
            tr: {
                    CLOSE: "Kapat",
                    NEXT: "İleri",
                    PREV: "Geri",
                    ERROR: "İstenilen içerik yüklenemedi. <br/> Lütfen daha sonra tekrar deneyin.",
                    PLAY_START: "Slayt gösterisini başlat",
                    PLAY_STOP: "Slayt gösterisini duraklat",
                    FULL_SCREEN: "Tam Ekran",
                    THUMBS: "Thumbnails",
                    DOWNLOAD: "İndir",
                    SHARE: "Paylaş",
                    ZOOM: "Yakınlaştır"
                }
        }
    });
    // fancybox -- ENDS HERE

    // language style customized -- STARTS HERE
    $('#language').selectbox({
        onOpen: function (inst) {

        },
        onClose: function (inst) {
            return false;
        },
        onChange: function (val, inst) {
            $('#' + inst.id + ' option[value="'+ val +'"]').prop("selected", true);
            switch(val) {
                case "ru":
                    window.location.href = "http://ru.dentway.com.tr/";
                    break;
                case "en":
                    window.location.href = "http://english.dentway.com.tr/";
                    break;
                case "jap":
                    $.fancybox.open('<img src="https://www.dentway.com.tr/wp-content/themes/dentway-madidus/dentway/images/dentway-japanese-2.jpg" />');
                    break;
                case "tr":
                    window.location.href = "https://www.dentway.com.tr/";
                    break;
              }
        },
        effect: "slide"
    });
    // language style customized -- ENDS HERE
});

$(window).resize(function(){
    // mobile pictures loaded get function -- STARTS HERE
    ImageSrcChange();
    // mobile pictures loaded get function -- ENDS HERE 
    navigationAppendPhone();
});

$(window).on("load", function(){ 
    // mobile pictures loaded get function -- STARTS HERE
    ImageSrcChange();
    // mobile pictures loaded get function -- ENDS HERE  
    navigationAppendPhone();
}); 

$(window).scroll(function () {
    if ($(this).scrollTop() > 160 && !$('#masthead').hasClass('sticky')) {
        $('#masthead, #search, #content, .nav-overlay, .nav-wrapper').addClass('sticky');
        //$("html, body").animate({
        //    scrollTop: $('.line12').offset().top
        //}, 600);
    }
    else if ($(this).scrollTop() < 160) {
        $('#masthead, #search, #content, .nav-overlay, .nav-wrapper').removeClass('sticky');
    }
});

function navigationAppendPhone() {
    if (deviceCheck() == "mobile") {
        if ($('#primary-menu .append').length == 0) {
            var mobile_nav_html = '';
            var whatsapp_number = $('.fr-info ul li.whatsapp a').attr('href');
            var whatsapp_number2 = $('.fr-info ul li.whatsapp a').text()
            var whatsapp_text = $('.fr-info ul li.whatsapp p').html().replace('<i class="icon-social-whatsapp"></i>', '');
            var phone_text = $('.fr-info ul li.phone p').html();
            var phone_number = $('.fr-info a.phone').attr('href');
            var phone_number2 = $('.fr-info a.phone').text();
            mobile_nav_html += '<li class="append whatsapp"><a href="' + whatsapp_number + '" target="_blank" title=""><i class="icon-social-whatsapp"></i><span class="whats-text">' + whatsapp_text + '</span><span class="whats-number">'+ whatsapp_number2 +'</span></a></li>';
            mobile_nav_html += '<li class="append phone"><a href="' + phone_number + '" title=""><i class="icon-telephone"></i><span class="whats-text">' + phone_text + '</span><span class="whats-number">'+ phone_number2 +'</span></a></li>';
            $('#primary-menu').append(mobile_nav_html);
        }
    }
    else{
        if ($('#primary-menu .append').length > 0) {
            $('#primary-menu .append').remove();
        }
    }
}

// gorsellerin device duruma gore "small" ya da "large" boyutlari burada degistirilir
function ImageSrcChange() {
    $('.src-change').each(function () {
        var $this = $(this);
        var $large = $this.attr('data-large');
        var $small = $this.attr('data-small');
        if (deviceCheck() == "desktop") { 
            if ($large != "") {
                $this.attr('src', $large);
            }
        }
        else { 
            if ($small != "") {
                $this.attr('src', $small);
            }
            else { 
                $this.attr('src', $large);
            }
        }
        $this.removeClass('blur');
    });
} 

function slideTop(offset){
    var $offset = 0;
    if(offset != undefined){
        $offset = offset;
    }
    $("html, body").animate({
        scrollTop: $offset
    }, {
        duration: 1200,
        easing: 'easeInOutExpo'
    });
}

function animateRipple(el, e){ 
    if ($(el).find(".ink").length === 0) {
        $(el).prepend("<span class='ink'></span>");
    }
    ink = $(el).find(".ink");
    ink.removeClass("animate");
    if (!ink.height() && !ink.width()) {
            d = Math.max($(el).outerWidth(), $(el).outerHeight());
            ink.css({ height: d, width: d });
    }
    x = e.pageX - $(el).offset().left - ink.width() / 2;
    y = e.pageY - $(el).offset().top - ink.height() / 2;
    ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
}


(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1500,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));


jQuery(function ($) {
    // custom formatting example
    $('.counter').data('countToOptions', {
      formatter: function (value, options) {
        return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, '.');
      }
    });
    
    // start all the timers
    $('.counter').each(count);  
    
    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data('countToOptions') || {});
      $this.countTo(options);
    }
  });