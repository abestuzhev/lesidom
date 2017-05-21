$(document).ready(function() {

// product page
$('.goods__slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.goods__nav-slider'
});

$('.goods__nav-slider').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.goods__slider',
	focusOnSelect: true,
	prevArrow: '<span class="goods__arrow goods__arrow-prev"><</span>',
	nextArrow: '<span class="goods__arrow goods__arrow-next">></span>'
});

});