(function($){

	function wheel(element, callback) {
		var mousewheelevt = (/Firefox/i.test(navigator.userAgent))
			?"MozMousePixelScroll"
			:"mousewheel";

		function handler(e) {
			e = e || window.event;
			// do not prevent if the scroll is 0% or 100%
			if (element.scrollTop > 0 && element.scrollTop < (element.scrollHeight - element.offsetHeight)) {
				e.preventDefault();
			}

			var normalized = e.detail ? e.detail * -1 : e.wheelDelta / 3;
			return callback.call(element, normalized);
		}

		element.addEventListener(mousewheelevt, handler, false);
	}

	// requestAnimationFrame polyfill
	var requestAnimFrame = window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| function(f){window.setTimeout(f, 1000 / 60);};

	// Plugin for jQuery
	$.fn.smoothScroll = function() {
		$(this).each(function() {
			var element = this, $element = $(element);

			// We need those variable in the scope
			var handler, $handler, _top, _left, _bottom, _right, _height, _width, _sheight, _swidth, _ratio, _bar;

			$handler = $("<span class='smoothScroll'/>").appendTo("body");
			handler = $handler[0]

			function refreshHandler(){
				_height  = element.clientHeight;
				_width   = element.clientWidth;
				_top     = $element.offset().top;
				_left    = $element.offset().left;
				_bottom  = _top + _height;
				_right   = _left + _width;
				_sheight = element.scrollHeight;
				_swidth  = element.scrollWidth;
				_ratio   = _height / _sheight;

				if (!handler.style.top) handler.style.top = _top + "px";
				handler.style.left = (_right-5) + "px";
				handler.style.height = _height * _ratio + "px";

				// If there is a min-height, then height might be different
				_handlerHeight = handler.clientHeight;
			}
			setTimeout(refreshHandler, 1); // ensure everything is on stage

			// Drag the handler
			var _memoPos, _memoClick;
			$handler.on("mousedown", function(e){
				e.preventDefault();
				$handler.addClass("drag");

				_memoClick = e.clientY;
				_memoPos   = element.scrollTop;

				$(window)
					.on("mousemove", function(e){
						element.scrollTop = _memoPos + (e.clientY - _memoClick)/_ratio;
						updateHandler();
					})
					.on("mouseup", function(){
						$(window).off("mousemove mouseup");
						$handler.removeClass("drag");
					});
				// Prevent text selection
				return false;
			});

			function showHandler(){
				if (_ratio < 1) $handler.addClass("show");
			}
			function updateHandler(){
				if (_sheight != element.scrollHeight) refresh();
				handler.style.top = (element.scrollTop * (_height-_handlerHeight) / (_sheight-_height) + _top) + "px";
			}
			function hideHandler(){
				$handler.removeClass("show");            
			}

			// Scroll the div
			// This function must be very fast
			var timer;
			wheel(element, function(deltaY){
				element.scrollTop -= deltaY;

				if (!timer){ timer = 1;
					$handler.addClass("move");
					(function animloop(){
						if (timer) requestAnimFrame(animloop);
						updateHandler();
					})();
				}

				clearTimeout(timer);
				timer = setTimeout(function(){
					$handler.removeClass("move");
					timer = false;
				}, 200);

			});

			// Manage the handler visibility
			$(element)
				.css("overflow-y", "hidden")
				.mouseenter(function(){
					refreshHandler();
					showHandler();
				})
				.mouseleave(function(){
					hideHandler();
				});
		});
	}

})(jQuery);