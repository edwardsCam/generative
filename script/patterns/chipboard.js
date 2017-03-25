var pattern_chipboard = (function () {

	var b = 4,
		timeBuff,
		chipboard;

	return {
		init: function (props) {
			timeBuff = 0;
			props.lineWidthSub = (props.maxLineWidth - props.minLineWidth) * props.minBlankSpace * 2;
			chipboard = new Chipboard(props);
			chipboard.createBoundary();
			chipboard.create(
				Math.randomInRange(-b, b),
				Math.randomInRange(-b, b), -b, -b, b, b,
				props.maxLineWidth - props.lineWidthSub
			);
		},
		animate: function (d) {
			timeBuff += d;
			chipboard.draw();
		},
		isStatic: true,
		isDrawn: function () {
			return chipboard.isComplete;
		}
	};

	function Chipboard(props) {
		var lines = [];
		var drawCursor = 0;
		this.create = create;
		this.createBoundary = createBoundary;
		this.draw = draw;
		this.isComplete = false;

		function create(c_x, c_y, min_x, min_y, max_x, max_y, w) {
			var dx = Math.diff(min_x, max_x),
				dy = Math.diff(min_y, max_y);
			if (dx < props.minBlankSpace || dy < props.minBlankSpace) return;
			if (w < props.minLineWidth) w = props.minLineWidth;

			lines.push(line(c_x, min_y, c_x, max_y, w));
			lines.push(line(min_x, c_y, max_x, c_y, w));

			botLeft();
			botRight();
			topRight();
			topLeft();

			function botLeft() {
				create(
					Math.randomInRange(min_x, c_x),
					Math.randomInRange(min_y, c_y),
					min_x, min_y, c_x, c_y,
					w - props.lineWidthSub
				);
			}

			function botRight() {
				create(
					Math.randomInRange(c_x, max_x),
					Math.randomInRange(min_y, c_y),
					c_x, min_y, max_x, c_y,
					w - props.lineWidthSub
				);
			}

			function topLeft() {
				create(
					Math.randomInRange(min_x, c_x),
					Math.randomInRange(c_y, max_y),
					min_x, c_y, c_x, max_y,
					w - props.lineWidthSub
				);
			}

			function topRight() {
				create(
					Math.randomInRange(c_x, max_x),
					Math.randomInRange(c_y, max_y),
					c_x, c_y, max_x, max_y,
					w - props.lineWidthSub
				);
			}
		}

		function createBoundary() {
			lines.push(line(-b, -b, -b, b, props.maxLineWidth));
			lines.push(line(-b, b, b, b, props.maxLineWidth));
			lines.push(line(b, b, b, -b, props.maxLineWidth));
			lines.push(line(b, -b, -b, -b, props.maxLineWidth));
		}

		function line(x1, y1, x2, y2, w) {
			var geom = DrawUtil.makeGeometry(x1, y1, x2, y2);
			geom.lineWidth = w;
			return geom;
		}

		function draw() {
			if (drawCursor < lines.length) {
				while (drawCursor < lines.length && timeBuff > props.drawTime) {
					timeBuff -= props.drawTime;
					var geom = lines[drawCursor++];
					var m = new MeshLineMaterial({
						resolution: Util.resolution(),
						lineWidth: geom.lineWidth,
						sizeAttenuation: 1,
						color: new THREE.Color(Color.palette[1])
					});
					DrawUtil.makeMeshLine(geom, m);
				}
			} else {
				this.isComplete = true;
			}
		}
	}
})();
