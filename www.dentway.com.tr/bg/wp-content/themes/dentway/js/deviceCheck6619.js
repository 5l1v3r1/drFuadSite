/*
    Developed by Aykut Kapisiz
*/

(function (window, document, undefined) {
    'use strict';
    var MatchMedia = debounce(function() {
        deviceCheck();
    }, 250);
    window.addEventListener('resize', MatchMedia);
    window.addEventListener('load', MatchMedia);
  })(window, document);
 

  function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function deviceCheck() {    
    var body = document.body;
    body.classList.remove('mobile');
    body.classList.remove('tablet');
    body.classList.remove('desktop');
    if (window.matchMedia("(max-width: 767px)").matches) {  
        body.classList.add("mobile"); 
        return "mobile";
    }
    else if (window.matchMedia("(max-width: 1024px)").matches) { 
        body.classList.add("tablet");
        return "tablet";
    } 
    else if (window.matchMedia("(min-width: 1025px)").matches) {  
        body.classList.add("desktop");
        return "desktop";
    } 
  }