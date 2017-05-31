$(document).ready(function() {

// home page

// nav
$(".mobile-header__search-toggle-icon").click(function() {
	$(".mobile-header__search").siblings().hide();
	$(".mobile-header__search-toggle").siblings().children().removeClass("mobile-header__toggle-icon_active");
	$(".mobile-header__search-toggle").siblings().removeClass("mobile-header__toggle_active");

	$(this).toggleClass("mobile-header__toggle-icon_active");
	$(".mobile-header__search-toggle").toggleClass("mobile-header__toggle_active");
	$(".mobile-header__search").slideToggle();
	$(".overley-page").fadeToggle();
});



$(".mobile-header__contact-toggle-icon").click(function() {
	$(".mobile-header__contact").siblings().hide();
	$(".mobile-header__contact-toggle").siblings().children().removeClass("mobile-header__toggle-icon_active");
	$(".mobile-header__contact-toggle").siblings().removeClass("mobile-header__toggle_active");

	$(this).toggleClass("mobile-header__toggle-icon_active");
	$(".mobile-header__contact-toggle").toggleClass("mobile-header__toggle_active");
	$(".mobile-header__contact").slideToggle();
	$(".overley-page").fadeToggle();
});



$(".mobile-header__nav-toggle-icon").click(function() {
	$(".mobile-header__nav").siblings().hide();
	$(".mobile-header__nav-toggle").siblings().children().removeClass("mobile-header__toggle-icon_active");
	$(".mobile-header__nav-toggle").siblings().removeClass("mobile-header__toggle_active");

	$(this).toggleClass("mobile-header__toggle-icon_active");
	$(".mobile-header__nav-toggle").toggleClass("mobile-header__toggle_active");
	$(".mobile-header__nav").slideToggle();
	$(".overley-page").fadeToggle();
});







$(".catalog__title").click(function() {
	$(".catalog__title-arrow").toggleClass("catalog__title-arrow_active");
	$(".catalog__wrapper_sm").slideToggle();
	$(".overley-page").fadeToggle();
});


$("#special-slider").owlCarousel({
	items:1,
	loop:true,
	nav:false,
	dots:true,
	smartSpeed:500,
	URLhashListener:true
}); 

$(".special__slide-dot").click(function() {
	$(".special__slide-dot").removeClass("special__slide-dot_active");
	$(this).addClass('special__slide-dot_active'); 
});


$("#top-product-slider, #new-product-slider, #discount-product-slider").owlCarousel({
	items:3,
	loop:true,
	smartSpeed:500,
	nav: true,
	navText: ['<div class="top-product__arrow top-product__arrow_left"><span><</span></div>', '<div class="top-product__arrow top-product__arrow_right"><span>></span></div>'],
	responsive:{
		0:{
			items:1
		},
		480:{
			items:2
		},
		600:{
			items:3
		}
	}
});

$(".to-top").click(function () {
	$("body,html").animate({scrollTop: 0}, 400);
	return false;
});


//site-map page
$(".map__toggle").click(function() {
	$(this).toggleClass("map__toggle_active");
	$(this).parent().children('.map__sub-list').slideToggle(); 
});


// карточка товара
$(".product-info__tab-content").not(":first").hide();
$(".product-info__tab-caption").click(function() {
	$(".product-info__tab-caption").removeClass("product-info__tab-caption_active").eq($(this).index()).addClass("product-info__tab-caption_active");
	$(".product-info__tab-content").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("product-info__tab-caption_active");


$("#accessory-product-slider, #similar-product-slider").owlCarousel({
	items:4,
	loop:true,
	smartSpeed:500,
	nav: true,
	navText: ['<div class="top-product__arrow top-product__arrow_left"><span><</span></div>', '<div class="top-product__arrow top-product__arrow_right"><span>></span></div>'],
	responsive:{
		0:{
			items:1
		},
		480:{
			items:2
		},
		600:{
			items:3
		},
		1024:{
			items:4
		}
	}
});

$(".catalog__link").click(function() {
	$(this).parent().children(".catalog__link-icon_sm").toggleClass("catalog__link-icon_sm-active");
	$(this).parent().next(".catalog__sub-menu").slideToggle();
	$(this).parent().toggleClass("catalog__item_active-sm");
});


//basket page
$(".quantity__minus").click(function () {
	var $input = $(this).parent().find(".quantity__input");
	var count = parseInt($input.val()) - 1;
	count = count < 1 ? 1 : count;
	$input.val(count);
	$input.change();
	return false;
});
$(".quantity__plus").click(function () {
	var $input = $(this).parent().find(".quantity__input");
	$input.val(parseInt($input.val()) + 1);
	$input.change();
	return false;
});


$(".basket__icon-close").click(function () {
	$(this).closest(".basket-product__row").hide(300);
});


//payment and delivery page
$(".obtainment__tab-content").not(":first").hide();
$(".obtainment__tab-caption").click(function() {
	$(".obtainment__tab-caption").removeClass("obtainment__tab-caption_active").eq($(this).index()).addClass("obtainment__tab-caption_active");
	$(".obtainment__tab-content").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("obtainment__tab-caption_active");


//vacancy page
$(".btn__head-toggle").click(function () {
	$(this).parent().parent().find(".job__body-hidden").toggle();
});


// basket-login page 
$(".basket-login__tab-content").not(":first").hide();
$(".basket-login__tab-caption").click(function() {
	$(".basket-login__tab-caption").removeClass("basket-login__tab-caption_active").eq($(this).index()).addClass("basket-login__tab-caption_active");
	$(".basket-login__tab-content").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("basket-login__tab-caption_active");


// personal-office page 
$(".personal__tab-content").not(":first").hide();
$(".personal__tab-caption").click(function() {
	$(".personal__tab-caption").removeClass("personal__tab-caption_active").eq($(this).index()).addClass("personal__tab-caption_active");
	$(".personal__tab-content").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("personal__tab-caption_active");
//


    $(".tab_content").hide();
    $(".tab_content:first").show();
    $("ul.tabs li").click(function() {
        $(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#"+activeTab).fadeIn();
        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab-accordion_heading").removeClass("d_active");
        $(".tab-accordion_heading[rel^='"+activeTab+"']").addClass("d_active");
    });


    $(".tab-accordion_heading").click(function() {
        $(this).siblings('.tab-accordion_heading').removeClass('tab-accordion_active');
        $(this).addClass('tab-accordion_active');
        $(".tab_content").hide();
        var d_activeTab = $(this).attr("rel");
        $("#"+d_activeTab).fadeIn();

        $(".tab-accordion_heading").removeClass("d_active");
        $(this).addClass("d_active");

        $("ul.tabs li").removeClass("active");
        $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");

        if ( $( this ).hasClass( "d_active" ) ) {
            $(this).removeClass("d_active");
            $("#"+d_activeTab).fadeIn();
        }
    });

	//показать/скрыть блок
    $('.js-btn-show').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('faq_active');
        $(this).parents(".faq_item").find(".faq_answer").slideToggle();
    });

    /*закрыть popup*/
    $(".c-popup_close").click(function(event) {
        event.preventDefault();
        $(this).parent('.c-popup').toggleClass('c-popup_show');
        $('.c-popup_bg').toggleClass('is-visible');
        $(this).parents('.c-popup_container').toggleClass('c-popup_show');
        $('body').toggleClass('body-popup');
    });

    $(".top-header__login").click(function(event) {
        event.preventDefault();
        $(".c-popup__auth").toggleClass('c-popup_show');
        $('.c-popup_bg').toggleClass('is-visible');
        // $(".c-popup_entity").parents('.c-popup_container').toggleClass('c-popup_show');
        $('body').toggleClass('body-popup');
    });

    $(".top-header__reg").click(function(event) {
        event.preventDefault();
        $(".c-popup__reg").toggleClass('c-popup_show');
        $('.c-popup_bg').toggleClass('is-visible');
        // $(".c-popup_entity").parents('.c-popup_container').toggleClass('c-popup_show');
        $('body').toggleClass('body-popup');
    });


    $('.btn__head-toggle').on('click', function(){
        $(this).toggleClass('btn__head-toggle--up');
		$(this).parents().siblings('.js-show__body').slideToggle();
	});

});




