$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
})

// $(document).ready(function(){
//     $('.owl-item #item_1').click(function(){
//         $('.menuwrapper article').css('display','none');
//         $("#first").css('display','block');
//     });
// });
// $(document).ready(function(){
//     $('.owl-item #item_2').click(function(){
//         $('.menuwrapper article').css('display','none');
//         $("#second").css('display','block');
//     });
// });
// $(document).ready(function(){
//     $('.owl-item #item_3').click(function(){
//         $('.menuwrapper article').css('display','none');
//         $("#third").css('display','block');
//     });
// });
// $(document).ready(function(){
//     $('.owl-item #item_4').click(function(){
//         $('.menuwrapper article').css('display','none');
//         $("#fourth").css('display','block');
//     });
// });

$(document).ready(function(){
    $('.item').click(function(){
        var showItem = $(this).data('show-item');
        $('.item.cart-active').removeClass('cart-active');
        $(this).addClass('cart-active');
        $('.menuwrapper article').hide();
        $(showItem).show();
    })
});