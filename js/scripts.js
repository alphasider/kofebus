$(document).ready(function(){

  // Change nav menu class

  var nav = $('.navigation');
  $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
          nav.addClass('navigation_white');
      } else {
          nav.removeClass('navigation_white');
      }
  });
  
  // Smooth scroll to anchor

   $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 60 // -70 for display section title
        }, 1000);
    });

  // Add | Remove active class from nav menu elements on scroll

  var navChildren = $('.navigation-menu li').children();
  var aArray = [];
  for (var i = 0; i < navChildren.length; i++) {
      var aChild = navChildren[i];
      var ahref = $(aChild).attr('href');
      aArray.push(ahref);
  }
  $(window).scroll(function () {
      var windowPos = $(window).scrollTop();
      var windowHeight = $(window).height();
      var docHeight = $(document).height();
      for (var i = 0; i < aArray.length; i++) {
          var theID = aArray[i];
          var secPosition = $(theID).offset().top;
          secPosition = secPosition - 135;
          var divHeight = $(theID).height();
          divHeight = divHeight + 90;
          if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
              $(".navigation-menu__item").removeClass('navigation-menu__item_active');
              $('li > a[href=\'' + theID + '\']').parent().addClass('navigation-menu__item_active');
          } else {
              $('a[href=\'' + theID + '\']').parent().removeClass('navigation-menu__item_active');
          }
      }
  });


  //Slider in HEADER
  
  $('.header-slider').slick({
    prevArrow:'<div class="slick-prev"><img src="assets/img/svg/arrow.svg" alt="Previous"></div>',
    nextArrow:'<div class="slick-next"><img src="assets/img/svg/arrow.svg" alt="Next"></div>'
  });

  // NavSlider in Menu
  
  $('.menu-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
  	prevArrow:'<div class="slick-prev"><img src="assets/img/svg/menu_icons/menu_arrow.svg" alt="Previous"></div>',
    nextArrow:'<div class="slick-next"><img src="assets/img/svg/menu_icons/menu_arrow.svg" alt="Next"></div>',
    asNavFor: '.menu-slider-captions, .pricing-menu',
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '150px',
    dots: true,
    initialSlide: 2
    //wariableWidth: true
  });

  // Show swipe notification in menu slider

  flag = true;
  var count = 0;
  $(".menu-slider .slick-arrow").click(function(){
      if(count < 2){
          count++;
      }
      else if(count = 2 && flag){
          count = 4;
          $('.menu-slider').addClass('filter-blur');
          $('.use-swipe').css('display', 'block');
          flag = false;
      }
  });
  $('.use-swipe').click(function(){
      $('.menu-slider').removeClass('filter-blur');
      $(this).css('display', 'none');
  });
  
  // Captions of products

  $('.menu-slider-captions').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.menu-slider',
    draggable: false
  });

  // Change caption on hover

  function changeCap(e){  // Returns to hovered element text (in img alt)
      var tar = e.target;
      if($(tar).is('.menu-slider__item')){
          var txt = tar.children[0].alt;
          $('.menu-slider-captions .slick-current').text(txt);
      }
      else if($(tar).is('img')){
          var txt = tar.alt;
          $('.menu-slider-captions .slick-current').text(txt);
      }
  }
  function returnCap() {  // Returns current (active) element's text
      var currentCaption = $('.menu-slider .slick-current .menu-icon').attr('alt');
      $('.menu-slider-captions .slick-active').text(currentCaption);
  }

  $('.menu-slider__item').hover(changeCap, returnCap);  // Change menu title
  

 /* $('.menu-slider__item').click(function(){
    var index = $(this).index();
    //index.addClass('active');
    $('.menu-slider-captions').slick('slickGoTo', index)
  });*/

  // Slider PRICING-MENU
  
  $('.pricing-menu').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    speed: 600,
    asNavFor: '.menu-slider',
    draggable: false,
    fade: true
  });

  // Slider PRICING MENU - thumbnails
  
  $('.pricing-menu__product-thumbs').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    speed: 600,
    draggable: false
    //asNavFor: '.menu-slider'
  });

  // Activation clicks PRICE-LIST
  
  $('.price-list li').click(function(){
    var index = $(this).index();
    $(this).siblings().removeClass('price-list__item_active');
    
    if ($(this).hasClass('price-list__item_active')){return;}
    else {$(this).addClass('price-list__item_active');}
    
    $('.pricing-menu__product-thumbs').slick('slickGoTo', index);
  });

  // Slider FACTS

  $('.bus__slider').slick({
    //slidesToShow: 1,
    //slidesToScroll: 1,
    prevArrow:'<div class="slick-prev"><img src="assets/img/svg/facts_arrow.svg" alt="Previous"></div>',
    nextArrow:'<div class="slick-next"><img src="assets/img/svg/facts_arrow.svg" alt="Next"></div>'
  });


  // Instagram photos


  function clicker(){ // Shake ainmation effect on click photos except the last one
    var lastEl = $('.gallery__item:last-child a');
    lastEl.addClass('animation_shake');
    setTimeout(function(){lastEl.removeClass('animation_shake')}, 1000);
  }
  (function(){
    var feed = new Instafeed({
        get: 'user',
        userId: 2298359993,
        accessToken: '2298359993.1677ed0.e9e32123c098474aa8266b660b3617ea',
        limit: 6,
        template: '<div class="gallery__item"><a href="#"><img src="{{image}}" target="_blank" alt="{{caption}}"></a></div>',
        resolution: 'standard_resolution',
        after: function(){
            //document.querySelector('#instalogo').style.display="none";
            //console.log('logo is hidden');
            var instaFeedImgs = document.querySelector('#instafeed');
            instaFeedImgs.lastChild.lastChild.href='https://www.instagram.com/kofebus/';
            instaFeedImgs.style.display="grid";
            $('.gallery__item:not(:last-child)').click(clicker); // Call clicker();
            //console.log('imgs are visible');
        }
    });
    feed.run();
  })();

  // Shake ainmation effect on click photos except the last one

  /*(function(){
    var lis = document.querySelectorAll('.gallery__item:not(:last-child)');
    lis.forEach(clicker);

    function clicker(item){
        item.addEventListener('click', function(){
            var lastEl = document.querySelector('.gallery__item:last-child a');
            lastEl.classList.add('animation_shake');
            setTimeout(function(){lastEl.classList.remove('animation_shake')}, 1000);
        });
    }
  })();*/

  


  // Parallax effect for interactive (bg) elements
    (function(){

        // Parallax in Footer section
        var scene_footer = $('#footer-parallax').get(0);
        var parallax_footer = new Parallax(scene_footer);
        var fix_height_FooterP = $('.footer').outerHeight();
        $('#footer-parallax').height(fix_height_FooterP); // Adjust the height of parallax container

        // Parallax in Menu section
        var scene_menu = $('#menu-parallax').get(0);
        var parallax_menu = new Parallax(scene_menu);
        var fix_height_MenuP = $('#menu').outerHeight();
        $('#menu-parallax').height(fix_height_MenuP) // Adjust the height of parallax container

         // Parallax in Facts section
        var scene_facts = $('#facts-parallax').get(0);
        var parallax_facts = new Parallax(scene_facts);
        var fix_height_FactsP = $('#facts').outerHeight();
        $('#facts-parallax').height(fix_height_FactsP) // Adjust the height of parallax container
    })();
    


  //////
  /*var preloader = new Promise((resolve, reject) => {
    const instadiv = document.querySelectorAll('#instafeed img');
    instadiv.onload = () => resolve();
    instadiv.onerror = () => reject();
  });
  const instaimg = document.querySelector('#instalogo');
  const instafeed = document.querySelector('#instafeed');
  preloader.then(instaimg.style.display ='none');
  preloader.then(instafeed.style.display ='grid');*/

  // Yandex Maps

    ymaps.ready(init);
    var kofeBusMap;

    // Initializing map
    function init(){     
        kofeBusMap = new ymaps.Map("map", {
            center: [55.80661496006422,38.98276948124935],
            zoom: 18,
            controls: []
        });

        // Creating a mark
        kofeBusMark = new ymaps.Placemark(
            [55.80661496006422,38.98276948124935],
            {
                hintContent: 'Кофебус'
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'assets/img/contacts/svg/icon_map_ballon.svg',
                iconImageSize: [64, 86],
                iconImageOffset: [-33, -85]
            }
        );

        // Disable zoom on scroll
        kofeBusMap.behaviors.disable(['scrollZoom']);

        // Adding a mark to the map
        kofeBusMap.geoObjects.add(kofeBusMark);
    }
  

  // Yandex Maps

});