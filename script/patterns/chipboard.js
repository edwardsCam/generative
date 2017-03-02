var chipboard = (function() {

	var b = 4;
	var minSize = 0.1;

	var material = new THREE.LineBasicMaterial({
		color: Color.palette[0]
	});
	var line = Util.makeLine.bind(null, material);

	return {
		init: init
	};

	function init() {
		square();

		var c_x = Math.randomInRange(-3, 3),
			c_y = Math.randomInRange(-3, 3);
		draw(c_x, c_y, -b, -b, b, b);
	}

	function draw(c_x, c_y, min_x, min_y, max_x, max_y) {
		if (Util.diff(min_x, max_x) < minSize || Util.diff(min_y, max_y) < minSize) return;

		line(c_x, min_y, c_x, max_y);
		line(min_x, c_y, max_x, c_y);

		setTimeout(function() {
			botLeft();
			botRight();
			topLeft();
			topRight();
		}, 100);

		function botLeft() {
			draw(
				Math.randomInRange(min_x, c_x),
				Math.randomInRange(min_y, c_y),
				min_x, min_y, c_x, c_y
			);
		}

		function botRight() {
			draw(
				Math.randomInRange(c_x, max_x),
				Math.randomInRange(min_y, c_y),
				c_x, min_y, max_x, c_y
			);
		}

		function topLeft() {
			draw(
				Math.randomInRange(min_x, c_x),
				Math.randomInRange(c_y, max_y),
				min_x, c_y, c_x, max_y
			);
		}

		function topRight() {
			draw(
				Math.randomInRange(c_x, max_x),
				Math.randomInRange(c_y, max_y),
				c_x, c_y, max_x, max_y
			);
		}
	}

	function square() {
		line(-b, -b, -b, b);
		line(-b, b, b, b);
		line(b, b, b, -b);
		line(b, -b, -b, -b);
	}
})();
