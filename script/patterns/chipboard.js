var chipboard = (function() {

	var b = 4;
	var minSize = 0.15;
	var minLineWidth = 0.02;
	var maxLineWidth = 0.2;
	var lineWidthSub = (maxLineWidth - minLineWidth) * minSize * 2;
	var timeoutTime = 0;

	return {
		init: init
	};

	function init() {
		square();
		draw(
			Math.randomInRange(-b, b),
			Math.randomInRange(-b, b), -b, -b, b, b,
			maxLineWidth - lineWidthSub
		);
	}

	function draw(c_x, c_y, min_x, min_y, max_x, max_y, w) {
		if (Util.diff(min_x, max_x) < minSize || Util.diff(min_y, max_y) < minSize) return;
		if (w < minLineWidth) w = minLineWidth;

		line(c_x, min_y, c_x, max_y, w);
		line(min_x, c_y, max_x, c_y, w);

		setTimeout(function() {
			botLeft();
			botRight();
			topLeft();
			topRight();
		}, timeoutTime);

		function botLeft() {
			draw(
				Math.randomInRange(min_x, c_x),
				Math.randomInRange(min_y, c_y),
				min_x, min_y, c_x, c_y,
				w - lineWidthSub
			);
		}

		function botRight() {
			draw(
				Math.randomInRange(c_x, max_x),
				Math.randomInRange(min_y, c_y),
				c_x, min_y, max_x, c_y,
				w - lineWidthSub
			);
		}

		function topLeft() {
			draw(
				Math.randomInRange(min_x, c_x),
				Math.randomInRange(c_y, max_y),
				min_x, c_y, c_x, max_y,
				w - lineWidthSub
			);
		}

		function topRight() {
			draw(
				Math.randomInRange(c_x, max_x),
				Math.randomInRange(c_y, max_y),
				c_x, c_y, max_x, max_y,
				w - lineWidthSub
			);
		}
	}

	function square() {
		line(-b, -b, -b, b, maxLineWidth);
		line(-b, b, b, b, maxLineWidth);
		line(b, b, b, -b, maxLineWidth);
		line(b, -b, -b, -b, maxLineWidth);
	}

	function line(x1, y1, x2, y2, w) {
		return DrawUtil.makeMeshLine(x1, y1, x2, y2, w);
	}

})();
