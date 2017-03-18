var pattern_roots = (function () {

	var minLineWidth = 0.03;
	var maxLineWidth = 0.1;

	var minLineLength = 0.1;
	var maxLineLength = 0.3;

	var minAngle = Math.PI * 0.1;
	var maxAngle = Math.PI * 0.6;

	var bound = 4;
	var resolution = 75;
	var squareSize = bound * 2 / resolution;
	var grid = buildGrid(resolution);

	var decayRate = 0.04;
	var pmin = 0.2;

	return {
		init: init
	};

	function init() {
		var master = new Roots(new THREE.Vector3(-bound * 0.75, -bound * 0.75), Math.PI / 4);
		//drawGrid();
		//fillPoints();
		master.draw();
	}

	function Roots(initPoint, initAngle) {
		this.draw = drawFn;

		var q = new Util.PriorityQueue('p');
		initPoint = initPoint || Util.centerVector();
		initAngle = initAngle || 0;
		var geoms = [buildLine(initPoint, initAngle, 1)];
		while (q.has() && hasEmptySpaces()) {
			var n = q.pop();
			geoms.push(buildLine(n.point, n.angle, n.p));
		}

		function drawFn(drawTimeout) {
			if (drawTimeout) {
				(function drawWithTimeout(i) {
					setTimeout(function () {
						drawOneLine(geoms[i]);
						if (i < geoms.length - 1) {
							drawWithTimeout(i + 1);
						}
					}, drawTimeout);
				})(0);
			} else {
				geoms.forEach(drawOneLine);
			}

			function drawOneLine(line) {
				DrawUtil.makeMeshLine(line, new MeshLineMaterial({
					resolution: Util.resolution(),
					lineWidth: line.initLineWidth,
					sizeAttenuation: 1,
					color: new THREE.Color(Color.palette[1])
				}), taper);
			}
		}

		/**
			Constructs a single geometry, which represents a single branch path.
		*/
		function buildLine(root, startAngle, p) {
			var g = new THREE.Geometry();
			g.initLineWidth = p;
			root = centerInCell(root);
			g.vertices = [root];
			var cursor = nextPoint(root, startAngle, p)
			while (inBounds(cursor)) {
				g.vertices.push(cursor);
				p = Math.max(p - decayRate, pmin);
				cursor = nextPoint(cursor, startAngle, p);
				q.push(queueObj(cursor, startAngle, p));
			}
			return g;

			function queueObj(point, angle, p) {
				if (point == null) return null;
				var da = Math.randomInRange(Math.PI * 0.25, Math.PI * 0.75);
				return {
					point: point,
					angle: Math.coinToss() ? angle + da : angle - da,
					p: p
				};
			}
		}

		/**
			Returns the next point, given a starting position and angle.
			Mark the grid squares along the way.
		*/
		function nextPoint(startPoint, startAngle, p) {
			var len = Math.interpolate([0, 1], [minLineLength, maxLineLength], p);
			var angleRange = Math.interpolate([0, 1], [maxAngle, minAngle], p);
			var angle = Math.randomInRange(-angleRange, angleRange) + startAngle;
			var newPoint = Math.coordWithAngleAndDistance(startPoint, angle, len);
			newPoint = extendTo(startPoint, newPoint);
			if (Util.vec2Equals(startPoint, newPoint)) {
				newPoint = null;
			} else {
				newPoint = Util.vec2toVec3(newPoint);
				markLine([startPoint, newPoint]);
			}
			return newPoint;
		}
	}

	/**
		extendTo:
			Extends a line from p1 towards p2, and either reaches p2, or hits an invalid point along the way and stops growing there.
			Return the point where it stopped.
	*/
	function extendTo(p1, p2) {
		p1 = centerInCell(p1);
		p2 = centerInCell(p2);
		var stepInfo = getStepInfo(p1, p2);
		var start = getOrdinalPosition(p1);
		var cursor = p1;
		while (stepInfo.numSteps--) {
			var prev = cursor;
			cursor = Math.coordWithAngleAndDistance(prev, stepInfo.theta, stepInfo.stepSize);
			if (!isValidPoint(cursor)) {
				return centerInCell(prev);
			}
		}
		return centerInCell(p2);

		function isValidPoint(p) {
			if (!inBounds(p)) return false;
			var c = getOrdinalPosition(p);
			return (c[0] == start[0] && c[1] == start[1]) || !grid[c[0]][c[1]];
		}
	}

	/**
		Similar to Bresenham's algorithm
	*/
	function markLine(line) {
		var p0 = centerInCell(line[0]),
			p1 = centerInCell(line[1]);
		markPoint(p0);
		var stepInfo = getStepInfo(p0, p1);
		var cursor = p0;
		while (stepInfo.numSteps--) {
			cursor = Math.coordWithAngleAndDistance(cursor, stepInfo.theta, stepInfo.stepSize);
			markPoint(cursor);
		}

		function markPoint(p) {
			var coord = getOrdinalPosition(p),
				row = coord[0],
				col = coord[1];
			if (row < resolution && col < resolution) {
				grid[row][col] = true;
			}
		}
	}

	function getStepInfo(p1, p2) {
		var stepSize = squareSize / resolution;
		return {
			theta: Math.thetaFromTwoPoints(p1, p2),
			stepSize: stepSize,
			numSteps: Math.floor(Math.distance(p1, p2) / stepSize)
		};
	}

	function inBounds(point) {
		return point != null && point.x >= -bound && point.x <= bound && point.y >= -bound && point.y <= bound;
	}

	/**
	    Given an ordinal position, return the corresponding cartesian location.

	    example: [0, 1] => (0.5, 1.5)
	*/
	function getCartesianCoord(i) {
		return i * squareSize - bound;
	}

	/**
	    Given a cartesian coordinate, return the corresponding ordinal position.

	    example: (0.5, 1.5) => [0, 1]
	*/
	function getOrdinalPosition(point) {
		var x = point.x + bound,
			y = point.y + bound;
		var r = Math.floor(y / squareSize),
			c = Math.floor(x / squareSize);
		if (r < 0) r = 0;
		if (c < 0) c = 0;
		return [r, c];
	}

	/**
	    Given a coordinate, adjust it so it's exactly in the center of its cell.
	*/
	function centerInCell(point) {
		var cell = getOrdinalPosition(point);
		point.x = cent(cell[1]);
		point.y = cent(cell[0]);
		return point;

		function cent(p) {
			return (p * squareSize + (squareSize / 2)) - bound;
		}
	}

	function fillPoints() {
		for (var r = 0; r < resolution; r++) {
			for (var c = 0; c < resolution; c++) {
				if (grid[r][c]) {
					var x = getCartesianCoord(c),
						y = getCartesianCoord(r);
					DrawUtil.makeSquare(x, y, x + squareSize, y + squareSize);
				}
			}
		}
	}

	function drawGrid() {
		DrawUtil.drawGrid(bound, resolution, 0x0000ff);
	}

	function buildGrid(res) {
		var g = [];
		for (var i = 0; i < res; i++) {
			g.push([]);
			for (var j = 0; j < res; j++) {
				g[i].push(false);
			}
		}
		return g;
	}

	function hasEmptySpaces() {
		return grid.some(function (r) {
			return r.some(function (c) {
				return c === true;
			});
		});
	}

	function taper(p) {
		//	return squareSize / 2;
		return Math.interpolate([0, 1], [maxLineWidth, minLineWidth], p);
	}
})();
