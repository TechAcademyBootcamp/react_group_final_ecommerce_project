$('.large-slider-item').click(function () {
    var fullWidth = $(window).width();

    if(fullWidth <= 768) {
        $('body').css('overflow', 'hidden');
        $('.image-popup-container').css({'height': '88vh', 'overflow-y': 'auto'});
    }

    $('.image-popup-container').fadeIn();
    slideAsIndex($(this).attr('data-index'));
    return false
});

$('.close-product-popup').click(function () {
    $('.image-popup-container').fadeOut();
    $('body').css('overflow', 'initial');
    $('.image-popup-container').css({'height': 'initial', 'overflow-y': 'initial'});

    $('html, body').animate({
        scrollTop: 30
    }, 0);
    return false;
})

var sections = $('section')
    , mainItems = $('.main-image-list-container')
    , sideItems = $('.side-images-container')
    , nav_height = 100;

$(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop()
        , popupHeight = $('.image-popup-container').outerHeight()
        , sideSliderHeight = $('.side-image-list-container').outerHeight()
        , sideSliderTopDistanse = cur_pos > 25 ? 150 : 205
        , windowHeight = $(window).height();

    var topPosition = (sideSliderTopDistanse - (sideSliderHeight - ((windowHeight - 100) - sideSliderTopDistanse))*cur_pos/popupHeight)/10;

    sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();
            $('.side-image-list-container').css('top', `${topPosition}rem`);

        if (cur_pos >= top && cur_pos <= bottom) {
            sideItems.find('.side-item').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            sideItems.find('li[data-index="'+$(this).attr('data-index')+'"]').addClass('active');
        }
    });
});

sideItems.find('li').on('click', function () {

    var $el = $(this) ,id = $el.attr('data-index');

    slideAsIndex(id);

    return false;
});

function slideAsIndex(id) {
    $('html, body').animate({
        scrollTop: mainItems.find('section[data-index="'+id+'"]').offset().top - nav_height + 10
    }, 500);
}
