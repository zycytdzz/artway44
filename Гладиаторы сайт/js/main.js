(function($) {
	'use strict';
	$(document).ready(function() {

		/// preview page JS

		$('.preview-block a').on('click', function() {
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top - 80
					}, 1000);
					return false;
				}
			}
		});

		/// end preview page JS

		carouselInit();
		coachFiltering();
		galleryInit();
		smoothscrollInit();
		nouisliderInit();
		selectInit();
		drawerInit();
		initMap();

		$('body').scrollspy({
			target: '#navbar-scrollspy',
			offset: 100
		});

		$('.-js_search_open').on('click', function() {
			$('.header-search').toggleClass('-show');
		});

		/// Dropdown

		$('.dropdown').on('show.bs.dropdown', function() {
			$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
		});

		/// Add slideUp animation to Bootstrap dropdown when collapsing.

		$('.dropdown').on('hide.bs.dropdown', function() {
			$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
		});

		/// lightbox

		$('#gallery-grid').slickLightbox({
			itemSelector: '.-lighbox_link',
		});
	});


	function carouselInit() {
		var
			classesFor = $('.slider-classes-for'),
			classesNav = $('.slider-classes-nav'),
			classesHome03 = $('.slider-classes-home03_js'),
			price = $('.slider-price'),
			testimonials = $('.slider-testimonials'),
			stories = $('.slider-stories-home01'),
			storiesHome02 = $('.slider-stories-home02'),
			storiesHome04 = $('.slider-stories-home04'),
			coachesHome02 = $('.slider-coaches.-home02'),
			coachesHome04 = $('.slider-coaches-home04'),
			testimonialsFor = $('.slider-testimonials-for'),
			testimonialsNav = $('.slider-testimonials-nav'),
			testimonialsSingleFor = $('.slider-quote-single-for'),
			testimonialsSingleNav = $('.slider-quote-single-nav'),
			shopSliderNav = $('.slider-shop-nav'),
			shopSliderFor = $('.slider-shop-for'),
			sliderShowOne = $('.slide-show-01');

		if (classesFor.length > 0 && classesNav.length > 0) {
			classesFor.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				asNavFor: '.slider-classes-nav'
			});

			classesNav.slick({
				slidesToShow: 6,
				slidesToScroll: 1,
				asNavFor: '.slider-classes-for',
				arrows: false,
				focusOnSelect: true,
				responsive: [{
						breakpoint: 992,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 1,
							asNavFor: '.slider-classes-for',
							arrows: false,
							focusOnSelect: true
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							asNavFor: '.slider-classes-for',
							arrows: false,
							focusOnSelect: true
						}
					},
					{
						breakpoint: 500,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							asNavFor: '.slider-classes-for',
							arrows: false,
							focusOnSelect: true
						}
					}
				]
			});
		}

		if (classesHome03.length > 0) {
			classesHome03.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: true,
				responsive: [{
						breakpoint: 1300,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							arrows: true,
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							arrows: true,
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows: true,
						}
					}
				]
			});
		}
		var width = window.innerWidth || document.body.clientWidth;


		if (width < 480) {
			if (price.length > 0) {
				price.slick({
					slidesPerRow: 1,
					slidesToScroll: 1,
					arrows: true
				});
			}
		} else {
			if (price.length > 0) {
				price.slick({
					slidesPerRow: 3,
					rows: 2,
					arrows: true,
					responsive: [{
							breakpoint: 1300,
							settings: {
								slidesPerRow: 2,
								rows: 2,
								arrows: true,
							}
						},
						{
							breakpoint: 992,
							settings: {
								slidesPerRow: 1,
								rows: 2,
								arrows: true,
							}
						},
						{
							breakpoint: 500,
							settings: {
								slidesPerRow: 1,
								slidesToScroll: 1,
								slidesToShow: 1,
								arrows: true,
								rows: 1,
							}
						}
					]
				});
			}
		}


		if (testimonials.length > 0) {
			testimonials.slick({
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: true,
				responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
					}
				}]
			});
		}

		if (stories.length) {
			stories.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true
			});
		}

		if (storiesHome02.length > 0) {
			storiesHome02.slick({
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: true,
				responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
					}
				}]
			});
		}

		if (storiesHome04.length > 0) {
			storiesHome04.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true
			});
		}

		if (coachesHome02.length > 0) {
			coachesHome02.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: true,
				responsive: [{
						breakpoint: 1500,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							arrows: true,
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							arrows: true,
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows: true,
						}
					}
				]
			});
		}

		if (coachesHome04.length > 0) {
			coachesHome04.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				arrows: true
			});
		}

		if (testimonialsFor.length > 0 && testimonialsNav.length > 0) {
			testimonialsFor.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				asNavFor: '.slider-testimonials-nav'
			});

			testimonialsNav.slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: '.slider-testimonials-for',
				// dots: true,
				arrows: false,
				centerMode: true,
				infinite: false,
				centerPadding: '0',
				focusOnSelect: true,
				responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						asNavFor: '.slider-testimonials-for',
						// dots: true,
						arrows: false,
						centerMode: true,
						infinite: false,
						centerPadding: '0',
						focusOnSelect: true,
					}
				}, ]
			});
		}

		if (testimonialsSingleFor.length > 0 && testimonialsSingleNav.length > 0) {
			testimonialsSingleFor.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.slider-quote-single-nav'
			});

			testimonialsSingleNav.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: '.slider-quote-single-for',
				// dots: true,
				arrows: false,
				centerMode: true,
				infinite: false,
				centerPadding: '0',
				focusOnSelect: true
			});
		}

		if (shopSliderFor.length > 0 && shopSliderNav.length > 0) {
			shopSliderFor.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.slider-shop-nav'
			});

			shopSliderNav.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				asNavFor: '.slider-shop-for',
				// dots: true,
				arrows: false,
				infinite: false,
				vertical: true,
				focusOnSelect: true,
				responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						asNavFor: '.slider-shop-for',
						// dots: true,
						arrows: false,
						infinite: false,
						vertical: false,
						focusOnSelect: true,
					}
				}, ]
			});
		}
	}

	function coachFiltering() {
		var slider = $('.js_slider-coaches'),
			filter = $('#coach-filter a');

		if (!slider.hasClass('-home02') && slider.length > 0) {
			slider.slick({
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: true,
				responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
					}
				}, ]
			});

			filter.on('click', function(e) {
				e.preventDefault();
				// window.location.hash = '';
				filter.removeClass('active');
				$(this).addClass('active');
				var href = $(this).attr('href').split('#')[1];
				slider.slick('slickUnfilter');
				if (href !== 'clear') {
					slider.slick('slickFilter', '[data-coach=' + href + ']');
				}
			});
		}
	}

	/// Shuffle JS Options 

	function galleryInit() {
		var Shuffle = window.shuffle;

		if ($('#gallery-grid').length > 0 && $('#gallery-filter').length > 0) {

			var myShuffle = new Shuffle(document.getElementById('gallery-grid'), {
				itemSelector: '.gallery-item',
				sizer: '.gallery-item',
				speed: 400,
				easing: 'ease',

			});

			myShuffle.update();

			$('#gallery-filter a').on('click' , function(){
				$('#gallery-filter a').removeClass('active');
				$(this).addClass('active');
				var catName = $(this).attr('data-group');

				myShuffle.filter(catName, shuffle);
				myShuffle.update();
			});

		}

		if ($('#blog-grid').length > 0) {

			var blogFilter = new Shuffle(document.getElementById('blog-grid'), {
				itemSelector: '.filter-item',
				sizer: '.filter-item',
				speed: 400,
				easing: 'ease',
			});
			blogFilter.update();

			$('#blog-filter a').on('click' , function(){
				$('#blog-filter a').removeClass('active');
				$(this).addClass('active');
				var catName = $(this).attr('data-group');

				blogFilter.filter(catName, shuffle);
				blogFilter.update();
			});
		}

		if ($('#shop-grid').length > 0) {

			var shopFilter = new Shuffle(document.getElementById('shop-grid'), {
				itemSelector: '.filter-item',
				sizer: '.filter-item',
				speed: 400,
				easing: 'ease',

			});

			shopFilter.update();

			$('#shop-filter a').on('click' , function(){
				$('#shop-filter a').removeClass('active');
				$(this).addClass('active');
				var catName = $(this).attr('data-group');

				shopFilter.filter(catName, shuffle);
				shopFilter.update();
			});
		}
	}

	function smoothscrollInit() {

		var wait_animation = true;

		$('a[href^="#to-"]').on('click', function(e) {
			if ($(this).closest('header').hasClass('fixed-left')) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('.navbar-collapse').collapse('hide');
					if ($(window).width() <= 991) {
						if ($('body').hasClass('drawer')) {
							$('body').drawer('close');
						}
					}
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}  else if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('.navbar-collapse').collapse('hide');
					if ($(window).width() <= 991) {
						if ($('body').hasClass('drawer')) {
							$('body').drawer('close');
						}
					}
					if($('body').hasClass('theme03')){
						$('html, body').animate({
							scrollTop: target.offset().top
						}, 1000);
					} else {
						$('html, body').animate({
							scrollTop: target.offset().top - 80
						}, 1000);
						
					}
					return false;
				}
			}
		});
	}

	function nouisliderInit() {
		if ($('#filter-range').length) {
			var filterRange = document.getElementById('filter-range');

			noUiSlider.create(filterRange, {
				start: [20, 80],
				connect: [false, true, false],
				range: {
					'min': 0,
					'max': 100
				}
			});

			var paddingMin = document.getElementById('filter-range-value-min'),
				paddingMax = document.getElementById('filter-range-value-max');

			filterRange.noUiSlider.on('update', function(values, handle) {
				if (handle) {
					paddingMax.innerHTML = Math.floor(values[handle]);
				} else {
					paddingMin.innerHTML = Math.floor(values[handle]);
				}
			});

		}
	}

	function selectInit() {
		if ($('.selectpicker').length) {
			// $('.selectpicker').selectpicker();
		}
	}

	function drawerInit() {
		if ($('.drawer').length) {
			$('.drawer').drawer();
		}
	}
	var SimpleFilter = (function() {
		function SimpleFilter(buttonSelector, itemSelector) {
			var button = $(buttonSelector);
			var item = $(itemSelector);

			button.on('click', function(e) {


				e.preventDefault();

				$(this).parent().find('a').removeClass('active');
				$(this).addClass('active');

				var filterClass = this.hash.slice(1);
				item.removeClass('hide');

				if (filterClass === 'f-clear') {
					// return;
				} else {
					$(':not(.' + filterClass + ')').addClass('hide');
					// return
				}

				if($(window).width() < 767){
					$('.timetable-col').each(function(index, el) {
						if ($(this).find('.timetable-item').not('.hide').length === 0) {
							$(this).hide();
						} else {
							$(this).show();
						}
					});
					
				}
			});
		}

		return SimpleFilter;
	}());

	var timetableFilter = new SimpleFilter('#timetable-filter a', '.timetable-item');
})(jQuery);

/**
 * Google map init
 */

var maps = maps || {};

function initMap() {
	if ($('#map').length) {
		var
			styledMap = [{ "featureType": "landscape", "stylers": [{ "hue": "#FFBB00" }, { "saturation": 43.400000000000006 }, { "lightness": 37.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FFC200" }, { "saturation": -61.8 }, { "lightness": 45.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.arterial", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 51.19999999999999 }, { "gamma": 1 }] }, { "featureType": "road.local", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 52 }, { "gamma": 1 }] }, { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": -13.200000000000003 }, { "lightness": 2.4000000000000057 }, { "gamma": 1 }] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF6A" }, { "saturation": -1.0989010989011234 }, { "lightness": 11.200000000000017 }, { "gamma": 1 }] }],
			myLatLng = { lat: 49.9885816, lng: 36.2425409 },

			styledMapType = new google.maps.StyledMapType(styledMap);

		maps.contactMap = new google.maps.Map(document.getElementById('map'), {
			center: myLatLng,
			zoom: 6,
			mapTypeControlOptions: {
				mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
			},
			icon: '/images/marker.svg'
		});

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: maps.contactMap,
			title: 'Hello World!'
		});

		maps.contactMap.mapTypes.set('styled_map', styledMapType);
		maps.contactMap.setMapTypeId('styled_map');
	}

	if ($('#multi_map').length) {
		var locations = [
			['Сhicago', 41.860757, -87.663993, 4],
			['New York', 40.739277, -73.985851, 5],
			['Washington', 38.898118, -77.031401, 3],
		];

		var map = new google.maps.Map(document.getElementById('multi_map'), {
			zoom: 5,
			center: new google.maps.LatLng(40.796333, -81.392963),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;

		for (i = 0; i < locations.length; i++) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map
			});

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);
				}
			})(marker, i));
		}
	}
}

//// IE change img to background image for better view

var userAgent, ieReg, ie;
userAgent = window.navigator.userAgent;
ieReg = /msie|Trident.*rv[ :]*11\./gi;
ie = ieReg.test(userAgent);

if(ie) {
  $(".gallery-item .img-wrap").each(function () {
	var $container = $(this),
		imgUrl = $container.find("img").prop("src");
	if (imgUrl) {
	  $container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("custom-object-fit");
	}
  });
}
