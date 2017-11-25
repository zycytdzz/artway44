;
(function($, window, document, undefined) {


    "use strict";
    var $window = $(window);
    var swipers = [];

    /*---------------*/
    /* hover elem*/
    /*---------------*/
    var hoverElem = $('.js-active');
    hoverElem.on('mouseover', function(event) {
        event.preventDefault();
        var $this = $(this);
        $this.parent().parent().parent().find('.js-active').removeClass('active');
        $this.addClass('active');
    });

    // equalHeight for columns
    $('.js-equal-cols > div').matchHeight({
      byRow: true
    });
    $.fn.matchHeight._beforeUpdate = function(event, groups) {
    }

    $.fn.matchHeight._afterUpdate = function(event, groups) {
    }

    /*---------------*/
    /* contact form*/
    /*---------------*/
    $('.js-quze-form').on("submit", function(e) {
        e.preventDefault();

        $('.ajax-loader').show();

        var url = 'mail.php',
            form = this;

        $(form).find('[name="fields[code]"]').remove();

        function result(class_key, data) {
            setTimeout(function() {
                $('.ajax-loader').hide();
                $('.ajax-result .success, .ajax-result .error').hide();
                $('.ajax-result').find(class_key).show().html(data);
            }, 500);
        }

        $.ajax({
                type: "POST",
                url: url,
                data: $(form).serialize(),
            })
            .done(function(data) {
                result('.success', data);
            }).error(function(data) {
                console.log(data);
                if (!data.status) {
                    data = 'Server not found.';
                } else {
                    if (data.statusText) {
                        data = data.statusText;
                        data += '<br>Error code: ';
                        data = data.status;
                    } else {
                        data = "Message wasn't sent, a technical error.<br>Error code: " + data.status;
                    }
                }
                result('.error', data);
            })


    });


    /*---------------*/
    /* animation on scroll*/
    /*---------------*/
    AOS.init({
        disable: function() {
            var maxWidth = 768;
            return $window.innerWidth < maxWidth;
        },
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        once: true,

        delay: 100
    });

    /*---------------*/
    /* pop up*/
    /*---------------*/
    $('.js-pop-up').magnificPopup({
        closeOnContentClick: true,
        type: 'image',
        closeBtnInside: true,
        gallery: {
            enabled: true
        }
    });
    /*---------------*/
    /* menu elem share search globe*/
    /*---------------*/
    $('.js-elem').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var $this = $(this),
            elem = $this.attr('data-elem');

        $(elem).fadeToggle();
        $this.toggleClass('active-after');
        /* Act on the event */
    });



    function hideMenuElem() {

        $('.js-not-hide').fadeOut();
        $('.js-elem').removeClass('active-after')

    }


    $('.js-not-hide button').on('click', hideMenuElem);
    $(document).on('click', hideMenuElem);

    $('.js-not-hide').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
    });



    /*---------------*/
    /* Product sort*/
    /*---------------*/
    $('.quze-sort a').on('click', function(event) {
        event.preventDefault();
        console.log('test');
        var $this = $(this);
        var $styles = $this.attr('data-style');
        if ($this.hasClass('.active-style')) {
            return false;
        } else {
            $this.parent().find('a').removeClass('active-style')
            $this.addClass('active-style')
            $('.quze-progect').removeClass('quze-progect_style2').removeClass('quze-progect_style3').addClass($styles)
            izotope_portfolio();
        }
    });

    /*---------------*/
    /* Contact map*/
    /*---------------*/
    if ($('.js-quze-map').length) {
        $('.js-quze-map').each(function() {
            initialize(this);
        });
    }

    function initialize(_this) {

        var stylesArray = {
            //style 1
            'style-1': [{ "featureType": "landscape", "stylers": [{ "hue": "#FFBB00" }, { "saturation": 43.400000000000006 }, { "lightness": 37.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FFC200" }, { "saturation": -61.8 }, { "lightness": 45.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.arterial", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 51.19999999999999 }, { "gamma": 1 }] }, { "featureType": "road.local", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 52 }, { "gamma": 1 }] }, { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": -13.200000000000003 }, { "lightness": 2.4000000000000057 }, { "gamma": 1 }] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF6A" }, { "saturation": -1.0989010989011234 }, { "lightness": 11.200000000000017 }, { "gamma": 1 }] }]
        };

        var styles, map, marker, infowindow,
            lat = $(_this).attr("data-lat"),
            lng = $(_this).attr("data-lng"),
            contentString = $(_this).attr("data-string"),
            image = $(_this).attr("data-marker"),
            styles_attr = $(_this).attr("data-style"),
            zoomLevel = parseInt($(_this).attr("data-zoom"), 10),
            myLatlng = new google.maps.LatLng(lat, lng);


        // style_1
        if (styles_attr == 'style-1') {
            styles = stylesArray[styles_attr];
        }
        // custom
        if (typeof hawa_style_map != 'undefined' && styles_attr == 'custom') {
            styles = hawa_style_map;
        }
        // or default style

        var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

        var mapOptions = {
            zoom: zoomLevel,
            disableDefaultUI: true,
            center: myLatlng,
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };

        map = new google.maps.Map(_this, mapOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        infowindow = new google.maps.InfoWindow({
            content: contentString
        });


        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: image
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

    }

    /*---------------*/
    /* home 9 dark style babkround menu on scroll*/
    /*---------------*/

    function onScroll() {
        var scrollPos = $(document).scrollTop(),
            menu = $('.dark-style .main-navigation  ');
        if (scrollPos > 50) {
            menu.addClass("dark-active");

        } else {
            menu.removeClass("dark-active");
        }

    }

    /*---------------*/
    /* home 8 height elem*/
    /*---------------*/
    function typeElem(elem) {

        var $typeElem = $(elem);
        var $maxHeight = 0;
        $typeElem.each(function(index, el) {
            var $height = $(this).outerHeight()
            $maxHeight = $maxHeight > $height ? $maxHeight : $height;
        });
        $typeElem.css('min-height', $maxHeight)
    }
    typeElem('.quze-type-item');
    typeElem('.quze-shop-item');
    typeElem('.quze-about-item');

    /*---------------*/
    /* timer*/
    /*---------------*/


    var deadline = new Date(Date.parse(new Date()) + 43 * 24 * 60 * 60 * 1000);

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }
    if ($('#comming-soon').length) {
        initializeClock('comming-soon', deadline);
    }






    /*---------------*/
    /* Izotope*/
    /*---------------*/
    function izotope_portfolio() {
        var isotope = $(".quze-izotope");
        if (isotope.length) {
            // masonry
            isotope.isotope({
                itemSelector: ".quze-izotope-item, .quze-progect-item",
                percentPosition: true

            });
        }
    }



    izotope_portfolio();


    /////////////////////////////////
    //  tabs-mobile
    ////////////////////////////////
    var $tab = $('.js-tabs-mobile'); 

    $tab.each(function(index, el) {
        var $this = $(this),
            elem = $this.parent('.tabs').find('.tabs-header li').eq(0).text();
        $this.find('span').text(elem)
    });
    $('.js-tabs-mobile').on('click', function(e) {
        e.preventDefault();
        var $this = $(this),
            elem = $this.parent('.tabs').find('.tabs-header');
        elem.slideToggle("slow");
    });


    /*---------------*/
    /* TAB*/
    /*---------------*/
    $('.tabs-header').on('click', 'li:not(.active)', function(e) {
        e.preventDefault();
        var $that = $(this);
        var index_el = $that.index();
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
        });

        $that.closest('.tabs').find('.tabs-content').fa

        $that.addClass('active').siblings().removeClass('active');
        var $tabs_items = $that.closest('.tabs').find('.tabs-item');
        $tabs_items.fadeOut(450)

        setTimeout(function(){
            $tabs_items.eq(index_el).fadeIn();  
            izotope_portfolio();
        },500);

        
        if ($window.width() < 769) {

            console.log($that.find('span').text());
            $that.closest('.tabs').find('.js-tabs-mobile span').text($that.find('span').text())
            $that.closest('.tabs').find('.js-tabs-mobile').next('.tabs-header').slideUp("slow");
        }


    });



    /////////////////////////////////
    // Star Rating Plugin
    ////////////////////////////////
    var starPlagin = $(".js-rating");
    if (starPlagin.length) {

        starPlagin.raty({
            number: function() {
                return $(this).attr("data-number");
            },
            half: false,
            starOff: "png-icon-star",
            // starOn: "fa fa-star"
        });
    }

    var starPlagin2 = $(".js-rating2");
    if (starPlagin2.length) {

        starPlagin2.raty({
            number: function() {
                return $(this).attr("data-number");
            },
            half: false,
            starOff: "png-icon-star2",
            starOn: "png-icon-star"
        });
    }

    function sliderCountersInit() {
        $('.quze-counts').each(function(){
            var $counters = $(this).find('.js-slide-count-item');
            for (var i = 0; i < $counters.length; i++) {
              counters($($counters[i]), true, true);
            }
        })
        // animate counters on slide change
    }
 

    /*---------------*/
    /* SWIPER SLIDER */
    /*---------------*/
    /*  data-slides-per-view = '3' // default slide for view
        data-loop = true // circle slides
        data-autoplay = '3000' // default, can add time for view slide ( 3000 )
        data-speed = '3000' //time animation slide
        data-space-between = '70' // 40 space between slides
        data-center = false //  If true, then active slide will be centered, not always on the left side.
        data-mode = 'horizontal' //Could be 'horizontal' or 'vertical' (for vertical slider).

        data-lg-slides = '3' //3 slider
        data-md-slides = '2' //2 slider
        data-sm-slides = '1'  //1 slider
        data-effect = 'slide' //  Could be "slide", "fade", "cube", "coverflow" or "flip"*/
    // data-arrow-next='.swiper-feedback-button-next' //можна вивести стрілки і пагінацію за межі слайдера
    // data-pagination='.swiper-feedback-pagination'
    //  data-arrow-prev='.swiper-feedback-button-prev'
    function initSwiper() {

        if ($window.width() <= 991) {
            $('.quze-news-slider  .swiper-container').attr('data-mode', 'horizontal');
        }
        else {
            $('.quze-news-slider  .swiper-container').attr('data-mode', 'vertical');
        }

        $('.swiper-container').each(function(index) {
            var that = $(this),
                sliderIndex = 'swiper-unique-id-' + index,
                thisButtonNext = '.swiper-button-next' + index,
                thisButtonPrev = '.swiper-button-prev' + index;

            // var autoHeight = that.attr('data-autoheight');
            var autoPlayVar = +that.attr('data-autoplay'),
                paginationType = that.attr('data-pagination-type'),
                mode = that.attr('data-mode'),
                slidesPerViewVar = parseInt(that.attr('data-slides-per-view'), 10),
                loopVar = that.attr('data-loop'),
                speedVar = parseInt(that.attr('data-speed'), 10),
                centerVar = that.attr('data-center'),
                effect = that.attr('data-effect'),
                spaceBetweenVar = parseInt(that.attr('data-space-between'), 10),
                dataNoSwiping = that.attr('data-no-swiping'),
                data1920Slides = that.attr('data-1920-slides'),
                data1500Slides = that.attr('data-1500-slides'),
                dataLgSlides = that.attr('data-lg-slides'),
                dataMdSlides = that.attr('data-md-slides'),
                dataSmSlides = that.attr('data-sm-slides');

            var dataArrowNext = that.attr('data-arrow-next'),
                dataArrowPrev = that.attr('data-arrow-prev'),
                dataPagination = that.attr('data-pagination');

            that.find('.swiper-button-next').addClass('swiper-button-next' + index);
            that.find('.swiper-button-prev').addClass('swiper-button-prev' + index);
            that.find('.swiper-pagination').addClass('pagination-' + sliderIndex);
            that.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);

            // news slider check
            var isNewsSlider = false;
            if (that.parent().hasClass('quze-news-slider')) {
                isNewsSlider = true;
            }

            swipers[sliderIndex] = new Swiper('.' + sliderIndex, {
                speed: speedVar || 300,
                pagination: dataPagination || '.pagination-' + sliderIndex,
                loop: loopVar || false,
                paginationClickable: true,
                autoplay: autoPlayVar || false,
                slidesPerView: slidesPerViewVar || 'auto',
                keyboardControl: true, // Set to true to enable navigation through slides using keyboard right and left (for horizontal mode), top and borrom (for vertical mode) keyboard arrows
                // autoHeight: autoHeight || true, // Set to true and slider wrapper will adopt its height to the height of the currently active slide
                simulateTouch: true, //If true, Swiper will accept mouse events like touch events (click and drag to change slides)
                roundLengths: true, //Set to true to round values of slides width and height to prevent blurry texts on usual resolution screens (if you have such)
                centeredSlides: centerVar || false,
                effect: effect || 'slide',
                direction: mode || 'horizontal',
                autoplayDisableOnInteraction: false,
                spaceBetween: spaceBetweenVar || 0,
                paginationType: paginationType || 'bullets',
                grabCursor: true,
                // noSwiping: dataNoSwiping || true, // add disable class for swiper arrow

                // Navigation arrows
                nextButton: dataArrowNext || thisButtonNext, //CSS selector or HTML element of the element that will work like "next" button
                prevButton: dataArrowPrev || thisButtonPrev, //CSS selector or HTML element of the element that will work like "prev" button
                // Responsive breakpoints
                breakpoints: {
                    // when window width is <= 768px

                    // when window width is <= 767px
                    767: {
                        slidesPerView: dataSmSlides || 1
                            // spaceBetween: 10
                    },
                    // when window width is <= 991px
                    991: {
                        slidesPerView: dataMdSlides || 1
                            // spaceBetween: 20
                    },
                    // when window width is <= 1199px
                    1199: {
                        slidesPerView: dataLgSlides || 1
                            // spaceBetween: 30
                    },
                    1500: {
                        slidesPerView: data1500Slides || dataLgSlides

                    },
                    1920: {
                        slidesPerView: data1920Slides || dataLgSlides

                    },
                },
                onInit: function(swiper) {
                    if (isNewsSlider) {
                        setSlideImg(swiper);
                    }
                },
                onSlideChangeEnd: function(swiper) {
                    if (isNewsSlider) {
                        setSlideImg(swiper);
                    }
                },
                onSlideChangeStart: function(swiper) {
                    if (isNewsSlider) {
                        setSlideImg(swiper);
                    }
                },
                onSlideClick: function(swiper) {
                    if (isNewsSlider) {
                        setSlideImg(swiper);
                    }
                },
                onSlideNextStart: function(swiper) {
                    if (isNewsSlider) {
                        setSlideImg(swiper);
                    }
                }
            });
            
            swipers[sliderIndex].update();

            // when mouse hover on slider - slide stop
            $('.swiper-container').on('mouseover', function() {
                swipers[sliderIndex].stopAutoplay();
            });

            $('.swiper-container').on('mouseout', function() {
                swipers[sliderIndex].startAutoplay();
            });
        });


    }


    function setSlideImg(swiper, textSelector) {
        //Overlay always contains NEXT item to the one displayed in slider.
        var totalRealSlides = swiper.slides.length - 2, //exclude 2 duplicated slides
            nextIndex = (swiper.realIndex + 1) % totalRealSlides,
            slideActive = $(swiper.slides[nextIndex + 1]),
            imgSrc = slideActive.find('.js-news-img').attr('src');
        $('.quze-news-img').attr('style', 'background-image: url("' + imgSrc + '")');
    }


    function changeSliderMode() {
        // $('.quze-news-slider  .swiper-unique-id-5').destroy();
        // console.log('run');
        // swipers['swiper-unique-id-5'].destroy();
        // console.log(swipers[]);
        // initSwiper();
    }
    /////////////////////////////////
    // Count
    ////////////////////////////////
    function counters($item, infiniteAnimate, noScrollEvent) {
        var $count = $item;
        if ($count.length) {
            $count.not(".animated").each(function() {
                var $that = $(this);
                var $atr = $that.attr('data-atr') || '';
                if (noScrollEvent || $window.scrollTop() >= $that.offset().top - $window.height() * 0.7) {
                  if (!infiniteAnimate) {
                    $that.addClass("animated")
                  }

                  $that.countTo({
                      formatter: function(value, options) {
                          return value.toFixed(options.decimals) + $atr;
                      }
                  });

                }
            });
        }
    }

    /////////////////////////////////
    // Skills progress bar
    ////////////////////////////////
    function progressBar() {
        var $progress = $(".js-progress");
        if ($progress.length) {

            $progress.each(function() {
                var $that = $(this),
                    $atr = $that.attr('data-width');
                if ($window.scrollTop() >= $that.offset().top - $window.height() * 0.7) {
                    $that.find('i').width($atr + '%');
                }
            });
        }
    }



    /*---------------*/
    /* MENU */
    /*---------------*/
    var $first_child_link = $('.menu-item-has-children > a').append('<span class="fa fa-angle-right"></span>');

    $('.js-nav-menu-icon').on('click', function(e) {
        $(this).toggleClass('active');

        $('.js-nav-menu-icon2').toggleClass('z-index');
        $('.main-navigation').toggleClass('active');
        $('html').toggleClass('overflov');
    });

    $('.js-nav-menu-icon2').on('click', function(e) {
        $(this).toggleClass('active');
        $('.js-nav-menu-icon').toggleClass('z-index');
        $('.main-navigation').toggleClass(' active-main-menu2');
        $('html').toggleClass('overflov');
    });

    $first_child_link.find('span').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('fa-angle-down');
        $(this).closest('li').find('> .sub-menu').slideToggle(100)
    });


    // add class for sub menu if view not corect
    $('.sub-menu').on('mousemove', function() {
        var $that = $(this);
        if ($that.offset().left > ($(window).width() / 2 + 300)) {
            $that.find('.sub-menu').addClass('sub-menu-left')
        }

    });

    /////////////////////////////////
    // BACKGROUND IMAGE
    ////////////////////////////////

    function wpc_add_img_bg(img_sel, parent_sel, img_height) {
        if (!img_sel) {
            console.info('no img selector');
            return false;
        }
        var $parent, $that;
        $(img_sel).each(function() {
            $that = $(this);
            $parent = $that.closest(parent_sel);
            $parent = $parent.length ? $parent : $that.parent();
            if (img_height) {
                $parent.css('background-image', 'url(' + this.src + ')');
                $that.css('visibility', 'hidden');
            } else {
                $parent.css('background-image', 'url(' + this.src + ')');
                $that.hide();
            }
        });
    }



    wpc_add_img_bg('.js-bg-img > img', '.js-bg-img');
    wpc_add_img_bg('.js-bg-img_with-height > img', '.js-bg-img_with-height', true); // BACKGROUND IMAGE with images height

    /////////////////////////////////
    // scroll
    ////////////////////////////////
    $(window).on('scroll', function() {
        counters($(".js-count-item"));
        progressBar();
        onScroll();
    });
    /////////////////////////////////
    // load
    ////////////////////////////////
    $(window).on('load', function() {
        initSwiper();
        izotope_portfolio();
        sliderCountersInit();
    });

    /////////////////////////////////
    // Resize;
    ////////////////////////////////
    $(window).on('resize', function() {
        initSwiper();
        changeSliderMode();
        izotope_portfolio();
        typeElem('.quze-type-item');
        typeElem('.quze-shop-item');
        typeElem('.quze-about-item');
    });


    $(window).on("orientationchange", function() {
        initSwiper();
        izotope_portfolio();
        typeElem('.quze-type-item');
        typeElem('.quze-shop-item');
        typeElem('.quze-about-item');
    });

})(jQuery, window, document);
