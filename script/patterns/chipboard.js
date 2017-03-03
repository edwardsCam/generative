var pattern_chipboard = (function() {

	var b = 4;
	var minSize = 0.05;
	var minLineWidth = 0.015;
	var maxLineWidth = 0.09;
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

		if (timeoutTime) {
			setTimeout(drawAll, timeoutTime);
		} else {
			drawAll();
		}

		function drawAll() {
			botLeft();
			botRight();
			topLeft();
			topRight();
		}

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
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(x1, y1, 0));
		geometry.vertices.push(new THREE.Vector3(x2, y2, 0));
		return DrawUtil.makeMeshLine(geometry, new MeshLineMaterial({
			resolution: Util.resolution(),
			lineWidth: w,
			sizeAttenuation: 1,
			color: new THREE.Color(Color.palette[1])
		}));
	}

})();
