$(document).ready(function(){
    /*
    * Home top slider
    * */
    $('.home-content').slick({
        dots: false,
        arrows: true,
        prevArrow: $('.white-circle-left'),
        nextArrow: $('.white-circle-right'),
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            }
        ]
    });


    /*
    * Home product list slider
    * */
    $('.flex-container-third').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        // arrows: false,
        prevArrow: $('.slider-part-left'),
        nextArrow: $('.slider-part-right'),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 600,
              settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                  centerMode: true,
              }
          },
          {
            breakpoint: 480,
            settings: {
                dots: false,
                arrows: false,
                centerMode: true,
                centerPadding: '30px',
                slidesToShow: 1
            }
          }
        ]
    });

    /*
    * Product page slider
    * */
    $('.large-product-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.small-product-slider',
    });

    $('.small-product-slider').slick({
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.large-product-slider',
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    vertical: false,
                    arrows: false,
                    centerPadding: '10px'
                }
            }
        ]
    });


    /*
    * Home product list slider
    * */

    $('.single-product-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerMode: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '30px',
                    slidesToShow: 1
                }
            }
        ]
    });

})
