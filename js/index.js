'use strict';
var addClass = function (element, className) {
	if (element.classList)
		element.classList.add(className);
	else
		element.className += ' ' + className;
};

var removeClass = function (element, className) {
	if (element.classList)
		element.classList.remove(className);
	else
		element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

var toggleClass = function (element, className) {

	if (element.classList) {
		element.classList.toggle(className);
	} else {
		var classes = element.className.split(' ');
		var existingIndex = classes.indexOf(className);

		if (existingIndex >= 0)
			classes.splice(existingIndex, 1);
		else
		classes.push(className);

		element.className = classes.join(' ');
	}
};

var closest = function (el, selector) {
	var matchesFn;

	['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
		if (typeof document.body[fn] == 'function') {
			matchesFn = fn;
			return true;
		}
		return false;
	});

	var parent;

	// traverse parents
	while (el) {
		parent = el.parentElement;
		if (parent && parent[matchesFn](selector) || el.className && new RegExp("(\\s|^)" + selector.replace('.', '') + "(\\s|$)").test(el.className)) {
			return parent;
		}
		el = parent;
	}

	return null;
};

var scrollToAnchor = function (anchorId, duration) {
	if (duration <= 0) return;

	var anchor = document.querySelector(anchorId)
		, currentLocation = window.pageYOffset
		, to = anchor.offsetTop;
	

	var difference = to - currentLocation
		, perTick = difference / duration * 5;
	
	setTimeout(function() {
		window.scrollTo(0, currentLocation + perTick);
		if (anchor.scrollTop == to) return;
		scrollToAnchor(anchorId, duration - 5);
	}, 5);
};

'use strict';
(function () {
	var headerBgBlock = document.querySelector('.header-bg')
	, headerBlock = document.querySelector("header")

	var headerBgBlockParallax = new scrollParallax({
		element: headerBgBlock
		, container: headerBlock
		, speed: 1
	}); 
})();
'use strict';
(function () {
	var scrollClass = 'is-scroll'
	, body = document.querySelector('body')
	, menuButton = document.querySelector('.menu_button')
	, menuShowClass = 'menu-show'
	, menuClass = '.menu_nav';

	window.addEventListener('scroll', function() {
		var scrollPosition = window.pageYOffset || document.documentElement.scrollTop,
			vieportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		if(scrollPosition >= vieportHeight/2){
			addClass(body, scrollClass);
		}else{
			removeClass(body, scrollClass);
		}
	});
	
	//menu-show
	menuButton.addEventListener('click', function(){
		toggleClass(body, menuShowClass);
	});

	window.addEventListener('click', function (event) {
		if(closest(event.target, menuClass))
			return;
		removeClass(body, menuShowClass);
		event.stopPropagation();
	});

})();
'use strict';
(function () {
	var mostWantedHeader = document.querySelector('.most-wanted_header')
		, mostWantedBlock = document.querySelector('#most_wanted')


	var mostWantedHeaderParallax = new scrollParallax({
		element: mostWantedHeader
		, container: mostWantedBlock
		, takePaddings: true
	});

})();
'use strict';
(function () {
	var mustHaveBlock = document.querySelector('#must_have')
		, mustHaveHeader = document.querySelector('.must-have_header')
		, mustHaveFirstHalfBlock = document.querySelector('.must-have_first-half')
		, mustHaveSecondHalfBlock = document.querySelector('.must-have_second-half');

	var mustHaveHeaderParallax = new scrollParallax({
		element: mustHaveHeader
		, container: mustHaveBlock
		, takePaddings: true
	});

	var mustHaveFirstHalfBlockParallax = new scrollParallax({
		element: mustHaveFirstHalfBlock
		, container: mustHaveBlock
		, speed: 1.1
	});

	var mustHaveSecondHalfBlockParallax = new scrollParallax({
		element: mustHaveSecondHalfBlock
		, container: mustHaveBlock
		, speed: 1.4
	});

})();
'use strict';
(function () {
	var $newsItems = $('.news_item'),
		feImage = 'feImage';

	$newsItems.hover(function() {
		$(this).find(feImage).animate({
			"x": "14%",
			"y": "6%",
			"width": "72%",
			"height": "88%"
		},
		{
			duration: 600,
			step: function (now, tween) {
				$(this).attr(tween.prop, now + "%");
			}
		});
	},
	function() {
		$(this).find(feImage).animate({
			"x": "50%",
			"y": "50%",
			"width": "0%",
			"height": "0%"
		},{
			duration: 600,
			step: function (now, tween) {
				$(this).attr(tween.prop, now + "%");
			}
		});
	});
})();
'use strict';
(function () {
	var newCollectionHeader = document.querySelector('.new-collection_header')
	, newCollectionBlock = document.querySelector('#new_collection');

	
	var newCollectionHeaderParallax = new scrollParallax({
		element: newCollectionHeader
		, container: newCollectionBlock
		, takePaddings: true
	}); 

})();
'use strict';

function scrollParallax(params) {

	this.extend = function (a, b){
		for(var key in b)
			if(b.hasOwnProperty(key))
				a[key] = b[key];
		return a;
	};

	var settings;

	var defaults = {
		speed: 1
		, units: 'px'
		, container: null
		, element: null
		, takePaddings: false
	};

	settings = this.extend( defaults, params);

	window.addEventListener('scroll', function() {
		var scrollPosition = window.pageYOffset || document.documentElement.scrollTop
			, elementHeight = settings.takePaddings ? settings.element.clientHeight : 0
			, containerOffset = settings.container.offsetTop
			, containerTopPadding = settings.takePaddings ? Math.round(parseInt(getComputedStyle(settings.container).paddingTop)) : 0
			, containerBotPadding = settings.takePaddings ? Math.round(parseInt(getComputedStyle(settings.container).paddingBottom)) : 0
			, containerOutHeight = settings.container.offsetHeight
			, startPoint = containerOffset + containerTopPadding
			, endPoint = containerOffset + containerOutHeight - elementHeight - containerBotPadding
			, parallaxValue = scrollPosition - containerOffset - containerTopPadding;


		
		if(scrollPosition >= startPoint && scrollPosition <= endPoint){
			settings.element.style.transform = "translateY(" + Math.round(parallaxValue/settings.speed) + settings.units +")";
			settings.element.style["-webkit-transform"] = "translateY(" +Math.round( parallaxValue/settings.speed) + settings.units +")";
			return;
		}

		if(scrollPosition < startPoint){
			settings.element.style.transform = "translateY(" + 0 + settings.units +")";
			settings.element.style["-webkit-transform"] = "translateY(" + 0 + settings.units +")";
			return;
		}

	});


}


'use strict';
(function () {
	var $preloader = $('.preloader');

	//fade-preloader
	$(window).on("load", function () {
		$preloader.delay(1500).fadeOut(1500);
	});

})();
'use strict';
(function () {
	var saleHeader = document.querySelector('.sale_header')
	, saleBlock = document.querySelector('#sale')
	, saleBgBlock = document.querySelector('.sale_bg');

	var saleHeaderParallax = new scrollParallax({
		element: saleHeader
		, container: saleBlock
		, takePaddings: true
	});

	var saleBgBlockParallax = new scrollParallax({
		element: saleBgBlock
		, container: saleBlock
		, speed: 1.2
	}); 


})();
'use strict';
(function () {
	var scrollLinks = document.querySelector('.scroll-to');


	scrollLinks.addEventListener('click', function (event) {
		event.preventDefault();
		var anchorId = event.target.getAttribute('href');
		scrollToAnchor(anchorId, 600);
	});


})();