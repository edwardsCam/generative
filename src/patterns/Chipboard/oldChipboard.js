var pattern_chipboard = (function () {

	var b = 4,
		timeBuff,
		chipboard;

	return {
		init(props) {
			timeBuff = 0;
			props.lineWidthSub = (props.maxLineWidth - props.minLineWidth) * props.minBlankSpace * 2;
			chipboard = new Chipboard(props);
			chipboard.createBoundary();
			chipboard.create(
				randInRange(-b, b, props.randomness),
				randInRange(-b, b, props.randomness), -b, -b, b, b,
				props.maxLineWidth - props.lineWidthSub
			);
		},
		animate(d) {
			timeBuff += d;
			chipboard.draw();
		},
		isStatic: true,
		isDrawn() {
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
					randInRange(min_x, c_x, props.randomness),
					randInRange(min_y, c_y, props.randomness),
					min_x, min_y, c_x, c_y,
					w - props.lineWidthSub
				);
			}

			function botRight() {
				create(
					randInRange(c_x, max_x, props.randomness),
					randInRange(min_y, c_y, props.randomness),
					c_x, min_y, max_x, c_y,
					w - props.lineWidthSub
				);
			}

			function topLeft() {
				create(
					randInRange(min_x, c_x, props.randomness),
					randInRange(c_y, max_y, props.randomness),
					min_x, c_y, c_x, max_y,
					w - props.lineWidthSub
				);
			}

			function topRight() {
				create(
					randInRange(c_x, max_x, props.randomness),
					randInRange(c_y, max_y, props.randomness),
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
						color: Color.buildFromProps(props)
					});
					DrawUtil.makeMeshLine(geom, m);
				}
			} else {
				this.isComplete = true;
			}
		}
	}

	function randInRange(min, max, randomness) {
		var middle = (min + max) / 2;
		min = Math.interpolate([0, 1], [middle, min], randomness);
		max = Math.interpolate([0, 1], [middle, max], randomness);
		return Math.randomInRange(min, max);
	}
})();
