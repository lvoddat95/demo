$(function () {
	if ($('#dok-header-top').length > 0) {
		$('.dok-header-item, #menu-main').hover(
			function () {
				clearTimeout($(this).data('timeout')); // Hủy bỏ timeout nếu đang có
				$('.dok-header-overlay').addClass('active');
				$(this).closest('#dok-header-top').find('#menu-main').attr('style', '');
			},
			function () {
				const element = $(this);
				const timeout = setTimeout(function () {
					if (!$('.dok-header-item:hover').length && !$('#menu-main:hover').length) {
						$('.dok-header-overlay').removeClass('active');
						element.closest('#dok-header-top').find('#menu-main').attr('style', 'display: none;'); // hoặc các style khác cần thiết khi không hover
					}
				}, 150); // 1000 milliseconds = 1 second
				$(this).data('timeout', timeout); // Lưu lại timeout để có thể hủy bỏ nếu cần
			}
		);

		// $('.dok-header-item').click(function () {
		// 	$('.dok-header-overlay').removeClass('active');
		// 	$('#dok-header-top').find('#menu-main').css("display", "none");
		// });


		$('.dok-header-item-mobile').click(function () {
			$(this).toggleClass('active');
			$(this).closest('#dok-header-top').find('#menu-main').toggleClass('active');
		});

		$('.dok-header-overlay').on("click", function () {
			$('.dok-header-overlay').removeClass('active');
			$('#dok-header-top').find('#menu-main').css("display", "none");
		});

		$('.dok-menu-mobile-close').click(function () {
			$('.dok-header-item-mobile').removeClass('active');
			$('#menu-main').removeClass('active');
		});
	};

	if ($('.show').length > 0) {
		$('.show').click(function () {
			const desc = $('.short');
			desc.removeAttr('style').removeClass('short').addClass('full').css({
				'max-height': '100%',
				'overflow-y': 'hidden',
			});
			$(this).hide();
		});
	}

	if ($('#dok_filter_total').length > 0) {
		$('#dok_filter_total').on('show.bs.collapse', function () {
			$("body").append("<div class='overlay-filter'></div>");
			$('html, body').animate({
				scrollTop: $(".dok-combination").offset().top - 100
			}, 500);
		});
		$('#dok_filter_total').on('hide.bs.collapse', function () {
			$(".overlay-filter").remove();
		});
		if ($('.close-popup-total').length > 0) {
			$(".close-popup-total").click(function (e) {
				e.preventDefault();
				$('#dok_filter_total').collapse('hide');
			});
		}
		$('body').on("click", ".overlay-filter", function (e) {
			console.log(123)
			e.preventDefault();
			$('#dok_filter_total').collapse('hide');
		});
	};

	$('.comment-btn__item blue').on('click', function () {
		$('.read-assess').addClass('showR');
		return false;
	});


	if ($('[data-sticky]').length > 0) {
		var sticky = new Sticky('[data-sticky]');
	};

	if ($('.ftoc').length > 0) {
		$(".btn-toc").on("click", function () {
			$(".ftoc").toggleClass("open");
		});

		// if($(this).width() <= 1600){
		//     $(".ftoc").removeClass('open');
		// }

		$(window).resize((event) => {
			const screenWidth = window.screen.width;
			let windowWidth = $(this).width();
			// Window width
			if (windowWidth <= 1600) {
				$(".ftoc").removeClass("open");
			} else {
				$(".ftoc").addClass("open");
			}
			// Window width
			if (screenWidth <= 1600) {
				$(".ftoc").removeClass("open");
			}
		});

		$('#toc').toc({
			'selectors': '.gtoc', // các phần tử sử dụng làm tiêu đề
			'container': '.article-content', // phần tử để tìm tất cả các selectors
			'smoothScrolling': true, // bật hoặc tắt cuộn mượt khi click
			'prefix': 'toc', // tiền tố cho thẻ anchor và tên class
			'onHighlight': function (el) { }, // gọi khi một phần mới được làm nổi bật
			'highlightOnScroll': true, // thêm class cho tiêu đề hiện đang được focus
			'highlightOffset': 100, // khoảng cách để kích hoạt tiêu đề tiếp theo
			'anchorName': function (i, heading, prefix) { // hàm tùy chỉnh cho tên anchor
				return prefix + i;
			},
			'headerText': function (i, heading, $heading) { // hàm tùy chỉnh để tạo văn bản tiêu đề
				return $heading.text();
			},
			'itemClass': function (i, heading, $heading, prefix) { // hàm tùy chỉnh cho tên class của mục
				return $heading[0].tagName.toLowerCase();
			}
		});
	}



	var swiper = new Swiper(".dok-product-thumbnail", {
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: true,
		slideToClickedSlide: true,
	});
	var swiper2 = new Swiper(".dok-product-img-main", {
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination-number",
			clickable: true,
			type: 'custom',
			renderCustom: function (current, total) {
				return (total - 1) + '/' + current.slides.length; 
			},
		},
		thumbs: {
			swiper: swiper,
		},
	});


	if ($('[data-fancybox="gallery"]').length > 0) {
		Fancybox.bind('[data-fancybox="gallery"]', {
			// Your custom options
		});
	}

	if ($('[data-fancybox="review"]').length > 0) {
		Fancybox.bind('[data-fancybox="review"]', {
			// Your custom options
		});
	}

	if ($('[data-fancybox="video"]').length > 0) {
		Fancybox.bind('[data-fancybox="video"]', {
			// Your custom options
		});
	}

	if ($(".dok-adv-slider").length > 0) {
		var main_slider = new Swiper(".dok-adv-slider", {
			slidesPerView: 1,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}



	if ($(".dok-products-slider").length > 0) {
		var product_slider = new Swiper(".dok-products-slider", {
			slidesPerView: 2,
			spaceBetween: 0,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 5,
				},
			},
		});
	}


	if ($(".dok-brand-list").length > 0) {
		var brand_slider = new Swiper(".dok-brand-list", {
			slidesPerView: 4,
			spaceBetween: 16,
			freeMode: true,
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
				clickable: true
			},
			breakpoints: {
				640: {
					slidesPerView: 4,
				},
				768: {
					slidesPerView: 6,
				},
				1024: {
					slidesPerView: 8,
				},
			},
		});
	};

	if ($(".dok-category-list").length > 0) {
		var category_slider = new Swiper(".dok-category-list", {
			slidesPerView: 3,
			spaceBetween: 16,
			freeMode: true,
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
				clickable: true
			},
			breakpoints: {
				640: {
					slidesPerView: 4,
				},
				768: {
					slidesPerView: 6,
				},
				1024: {
					slidesPerView: 8,
				},
			},
		});
	};

	if ($(".dok-partner-list").length > 0) {
		var partner_slider = new Swiper(".dok-partner-list", {
			slidesPerView: 1,
			spaceBetween: 16,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				640: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
			},
		});
	};


	var swiper = new Swiper(".nav-newscate", {
		slidesPerView: "auto",
		freeMode: true,
	});

	// Len dau trang
	$(".go-top").on("click", function () {
		$("html, body").animate({
			scrollTop: 0,
		},
			500
		);
	});

	$(document).on("click", "#clickShowSendReview", function () {
		$("#dok_review_pdp_show_npv").css("display", "none");
		$("#clickShowSendReview").css("display", "none");
		$("#send_vote_npv").css("display", "flex");
		$(".wrap_post_composer_pdp").css("display", "block");
	});

});




function do_active_slt(elem) {
	// get all 'a' elements
	var li = document.querySelectorAll('ul.ul-star > li');
	// loop through all 'a' elements
	for (i = 0; i < li.length; i++) {
		// Remove the class 'active' if it exists
		li[i].classList.remove('active-slt')
	}
	// add 'active' classs to the element that was clicked
	elem.classList.add('active-slt');
}

var showInputRating = function () {
	$(".read-assess").show();
	$("body").addClass("overlay");
}

var hideInputRating = function () {
	$(".read-assess").hide();
	$("body").removeClass("overlay");
}

var show_search_box = function (p_this) {
	$(p_this).focus();
	$("#dok_mb_search").show();
}

var hide_search_box = function (p_this) {
	$(p_this).focus();
	$("#dok_mb_search").hide();
}
var likeRating = function () {
	$(".click-like").find("i").removeClass('icondetail-likewhite');
	$(".click-like").find("i").addClass('icondetail-like');
}

var showRatingCmtChild = function (pid) {
	$(".r" + pid).show();
}
var ratingRelply = function (pid) {
	$(".rRepPopup").show();
	$("body").addClass("overlay");
}
var hideReplyConfirmPopup = function (pid) {
	$(".rRepPopup").hide();
	$("body").removeClass("overlay");
}