$(function () {
	if ($('#dok-header-top').length > 0) {
		$('.dok-header-item, .menu-tree').hover(
			function () {
				clearTimeout($(this).data('timeout')); // Hủy bỏ timeout nếu đang có
				$('.dok-header-overlay').addClass('active');
				$(this).closest('#dok-header-top').find('#menu-main').attr('style', '').addClass('hover');
			},
			function () {
				const element = $(this);
				const timeout = setTimeout(function () {
					if (!$('.dok-header-item:hover').length && !$('.menu-tree:hover').length) {
						$('.dok-header-overlay').removeClass('active');
						element.closest('#dok-header-top').find('#menu-main').attr('style', 'display: none;').removeClass('hover'); // hoặc các style khác cần thiết khi không hover
					}
				}, 150); // 1000 milliseconds = 1 second
				$(this).data('timeout', timeout); // Lưu lại timeout để có thể hủy bỏ nếu cần
			}
		);
	};

	if ($('.filter-item__title').length > 0) {
		$('.filter-item__title').click(function () {
			var $parentFilterItem = $(this).parent('.filter-item');

			if ($parentFilterItem.hasClass('active')) {
				$parentFilterItem.removeClass('active');
			} else {
				$('.filter-item').removeClass('active');
				$parentFilterItem.addClass('active');
			}
		});
	}

	if ($('.c-btnbox').length > 0) {
		$('.c-btnbox').click(function () {
			console.log(123)
			$(this).toggleClass("check");
		});
	}

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
				console.log($('.dok_filter_total'))
				e.preventDefault();
				$('.dok_filter_total').collapse('hide');
			});
		}
		$('body').on("click", ".overlay-filter", function (e) {
			console.log(123)
			e.preventDefault();
			$('#dok_filter_total').collapse('hide');
		});
	};


	if ($('.box-mobile-filters').length > 0) {

		if ($('#dok-search-filter').length > 0) {
			var qsRegex;
			var $grid = $('#dok-search-filter').isotope({
				itemSelector: '.f-elem',
				layoutMode: 'fitRows',
				filter: function () {
					return qsRegex ? $(this).text().match(qsRegex) : true;
				}
			});
			var $quicksearch = $('#quick-search').keyup(debounce(function () {
				console.log(123)
				qsRegex = new RegExp($quicksearch.val(), 'gi');
				$grid.isotope();
			}, 200));
			function debounce(fn, threshold) {
				var timeout;
				threshold = threshold || 100;
				return function debounced() {
					clearTimeout(timeout);
					var args = arguments;
					var _this = this;
					function delayed() {
						fn.apply(_this, args);
					}
					timeout = setTimeout(delayed, threshold);
				};
			}
			$('.box-mobile-filters').on('shown.bs.modal', function (e) {
				$grid.isotope('layout');
			});
			$grid.on('layoutComplete', function (event, laidOutItems) {
				// console.log(event)
				$('#dok-search-filter').addClass('layoutComplete');
			})
			$('.show-total-content').on('hidden.bs.collapse', function (e) {
				$grid.isotope('layout');
			});
			$('.show-total-content').on('shown.bs.collapse', function (e) {
				$grid.isotope('layout');
			});
		};

		function updateItemsVisibility(container) {
			var itemsPerRow = $(container).data('rows');
			var items = $(container).find('.c-btnbox');

			items.each(function (index) {
				var rowNumber = Math.floor(index / itemsPerRow) + 1;
				if (rowNumber > itemsPerRow) {
					$(this).addClass('hidden');
				} else {
					$(this).removeClass('hidden');
				}
			});

			if (items.length > itemsPerRow * itemsPerRow) {
				$(container).next('.show-more').show();
			} else {
				$(container).next('.show-more').hide();
			}
		}

		$('.filter-list').each(function () {
			updateItemsVisibility(this);
		});

		$('.show-more').click(function () {
			var container = $(this).prev('.filter-list');
			container.find('.hidden').removeClass('hidden');
			$(this).hide();
			if ($('#dok-search-filter').length > 0) {
				$grid.isotope('layout');
			}
		});
	}

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

	if ($('#scroll-to-item').length > 0) {

		$('#scroll-to-item ul li a').click(function (event) {
			event.preventDefault();

			// Lấy giá trị của thuộc tính href, loại bỏ dấu # để lấy id của phần tử cần cuộn đến
			var targetId = $(this).attr('href').substring(1);

			// Tìm phần tử có id tương ứng
			var targetElement = $('#' + targetId);

			// Kiểm tra xem phần tử có tồn tại hay không
			if (targetElement.length) {
				// Cuộn mượt mà đến vị trí của phần tử đó
				$('html, body').animate({
					scrollTop: targetElement.offset().top
				}, 1000, function () {
					// Thêm lớp active vào thẻ a đã được click
					$('#scroll-to-item ul li a').removeClass('active');
					$('a[href="#' + targetId + '"]').addClass('active');
					console.log(123)
				}); // Thời gian cuộn (1000ms = 1 giây)
			} else {
				console.warn('Element with id ' + targetId + ' not found.');
			}
		});

		// Xử lý sự kiện cuộn trang để thêm/xóa lớp active vào thẻ a tương ứng
		$(window).scroll(function () {
			var scrollPos = $(document).scrollTop();

			$('#scroll-to-item ul li a').each(function () {
				var currLink = $(this);
				var targetId = currLink.attr("href").substring(1);
				var targetElement = $('#' + targetId);

				if (targetElement.length) {
					var targetPos = targetElement.offset().top;
					var targetHeight = targetElement.outerHeight();

					if (scrollPos >= targetPos && scrollPos < targetPos + targetHeight) {
						$('#scroll-to-item ul li a').removeClass('active');
						currLink.addClass('active');
					}
				}
			});
		});
	}



	var product_slider_thumb2 = new Swiper(".dok-product-thumbnail2-js", {
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: false,
		slideToClickedSlide: true,
	});
	var product_slider_main2 = new Swiper(".dok-product-img-main2-js", {
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
				return (total) + '/' + current.slides.length;
			},
		},
		thumbs: {
			swiper: product_slider_thumb2,
		},
	});

	var product_slider_thumb = new Swiper(".dok-product-thumbnail-js", {
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: false,
		slideToClickedSlide: true,
	});
	var product_slider_main = new Swiper(".dok-product-img-main-js", {
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
				return (total) + '/' + current.slides.length;
			},
		},
		thumbs: {
			swiper: product_slider_thumb,
		},
		on: {
			click: function () {
				var clickedIndex = this.clickedIndex;
				product_slider_main2.slideTo(clickedIndex);
			}
		},
	});


	$('#dok-product-modal-preview').on('shown.bs.modal', function (e) {
		var tab = $(e.relatedTarget).data('tab');
		switch (tab) {
			case 'image':
				activateTab('#dok-product-modal-tab', '#tab-image');
				break;
			case 'video':
				activateTab('#dok-product-modal-tab', '#tab-video');
				break;
			case 'technical':
				activateTab('#dok-product-modal-tab', '#tab-technical');
				break;
			default:
			// code block
		}

	});

	$('.dok-tab-item').click(function (event) {
		event.preventDefault();
		const $parentTabs = $(this).closest('.dok-tabs');
		$parentTabs.find('.dok-tab-item').removeClass('active');
		$parentTabs.find('.dok-tab-pane').removeClass('active');
		$(this).addClass('active');
		const targetPane = $(this).find('a').attr('href');
		$parentTabs.find(targetPane).addClass('active');

	});

	$('.dok-btn-tab').click(function () {
		const targetPane = $(this).data('tab');
		const parentTabsId = $(this).data('tabs');
		const $parentTabs = $(parentTabsId);
		$parentTabs.find('.dok-tab-item').removeClass('active');
		$parentTabs.find('.dok-tab-pane').removeClass('active');
		$parentTabs.find(`.dok-tab-item a[href='${targetPane}']`).parent().addClass('active');
		$parentTabs.find(targetPane).addClass('active');

	});

	$('#tab-video [data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
		var activeTab = $(e.target).data('bs-target');
		console.log(activateTab)
	});

	if ($('[data-fancybox="gallery"]').length > 0) {
		Fancybox.bind('[data-fancybox="gallery"]', {
			// Your custom options
		});
	}

	if ($('[data-fancybox="review"]').length > 0) {
		Fancybox.bind('[data-fancybox="review"]', {
			caption: (fancybox, slide) => {
				const caption = slide.caption || "";

				return `${slide.index + 1} / ${fancybox.carousel?.slides.length
					} <br /> ${caption}`;
			},
		});
	}

	if ($('[data-fancybox="video-gallery"]').length > 0) {
		Fancybox.bind('[data-fancybox="video-gallery"]', {
			Thumbs: {
				type: "classic",
			},
			parentEl: document.getElementById("tab-video")
		});
	}


	if ($(".dok-adv-slider").length > 0) {
		var main_slider = new Swiper(".dok-adv-slider", {
			slidesPerView: 1,
			loop: true,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
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

	// Slider sản phẩm trong bài post
	if ($(".dok-products-post").length > 0) {
		var product_in_post = new Swiper(".dok-products-post", {
			slidesPerView: 2,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
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
					slidesPerView: 3,
				},
			},
		});
	}

	// Slider sản phẩm home
	if ($(".dok-products-slider").length > 0) {
		var product_slider = new Swiper(".dok-products-slider", {
			slidesPerView: 2,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
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
			spaceBetween: 8,
			loop: true,
			freeMode: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
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
			spaceBetween: 8,
			loop: true,
			freeMode: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
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
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
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

	if ($(".dok-hotline-slider").length > 0) {
		var hotline_slider = new Swiper(".dok-hotline-slider", {
			slidesPerView: 2,
			spaceBetween: 16,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
				clickable: true
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 4,
				},
			},
		});
	};

	if ($(".nav-newscate").length > 0) {
		var swiper = new Swiper(".nav-newscate", {
			slidesPerView: "auto",
			freeMode: true,
		});
	};

	if ($(".dok-menu-mobile-category").length > 0) {
		var hotline_slider = new Swiper(".dok-menu-mobile-category", {
			slidesPerView: 3,
			spaceBetween: 0,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
				clickable: true
			},
		});
	};

	if ($('#go-top').length > 0) {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#go-top').fadeIn();
			} else {
				$('#go-top').fadeOut();
			}
		});
		// Len dau trang
		$("#go-top").on("click", function (e) {
			e.preventDefault();
			$("html, body").animate({
				scrollTop: 0,
			},
				500
			);
		});
	}

	$('.decrease').click(function () {
		let _counter = $(this).closest('.counter-container').find('.counter-input');
		let currentValue = parseInt(_counter.val());
		if (currentValue > 1) {
			_counter.val(currentValue - 1);
		}
	});

	$('.increase').click(function () {
		let _counter = $(this).closest('.counter-container').find('.counter-input');
		let currentValue = parseInt(_counter.val());
		_counter.val(currentValue + 1);
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 120) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 70) {
			$('#header-simple').addClass('fixed');
		} else {
			$('#header-simple').removeClass('fixed');
		}
	});

	toggleScrollClass('#header, .bottom-nav, .header-simple, #go-top, .dok-product-filter.mobile');
	toggleScrollClass('#scroll-to-item', 70);


});


function toggleScrollClass(selector, threshold = 0) {
	var lastScrollTop = 0;
	var scrollTimeout;

	$(window).scroll(function () {
		clearTimeout(scrollTimeout);

		var st = $(this).scrollTop();

		// Kiểm tra nếu vị trí cuộn qua ngưỡng được xác định
		if (st > threshold) {
			if (st > lastScrollTop) {
				$(selector).removeClass('up stop').addClass('down');
			} else {
				$(selector).removeClass('down stop').addClass('up');
			}
		} else {
			$(selector).removeClass('up down stop'); // Xóa các lớp nếu chưa qua ngưỡng
		}

		lastScrollTop = st;

		scrollTimeout = setTimeout(function () {
			if (st > threshold) {
				$(selector).addClass('stop');
			}
		}, 500);
	});
}

function activateTab(tabsId, tabId) {
	const $parentTabs = $(tabsId);
	$parentTabs.find('.dok-tab-item').removeClass('active');
	$parentTabs.find('.dok-tab-pane').removeClass('active');
	$parentTabs.find(`.dok-tab-item a[href='${tabId}']`).parent().addClass('active');
	$parentTabs.find(tabId).addClass('active');
}

function stopAllVideos() {
	$('#tab-video iframe').each(function () {
		var src = $(this).attr('src');
		console.log(src)
		$(this).attr('src', src);
	});
}

