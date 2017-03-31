var pattern_roots = (function () {

	var bound = 4;
	var grid;
	var roots;
	var timeBuff = 0;

	return {
		init,
		isStatic: true,
		animate(d) {
			timeBuff += d;
			roots.draw();
		},
		isDrawn() {
			return roots.complete;
		}
	};

	function init(props) {
		timeBuff = 0;
		grid = buildGrid(props.resolution);
		roots = new Roots(props);
		if (props.showGrid) {
			drawGrid(props.resolution);
		}
		//roots.fillGridSquares();
	}

	function Roots(props) {
		var rootsObj = this;
		this.draw = drawFn;
		this.complete = false;
		this.fillGridSquares = fillGridSquares;

		var resolution = props.resolution;
		var squareSize = bound * 2 / resolution;

		var q = new Util.PriorityQueue('p');
		var initPoint = new THREE.Vector3(props.startX, props.startY);
		var initAngle = Math.toRadians(props.startAngle);
		var geoms = [
			buildLine(initPoint, initAngle, 1)
		];
		while (q.has() && hasEmptySpaces()) {
			var n = q.pop();
			geoms.push(buildLine(n.point, n.angle, n.p));
		}

		var drawCursor = 0;

		function drawFn() {
			if (drawCursor < geoms.length) {
				while (drawCursor < geoms.length && timeBuff > props.drawTime) {
					timeBuff -= props.drawTime;
					drawOneLine(geoms[drawCursor++]);
				}
			} else {
				rootsObj.complete = true;
			}

			function drawOneLine(line) {
				DrawUtil.makeMeshLine(line, new MeshLineMaterial({
					resolution: Util.resolution(),
					lineWidth: line.initLineWidth,
					sizeAttenuation: 1,
					color: Color.buildFromProps(props)
				}), taper);
			}
		}

		/**
			buildLine:
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
				p = Math.max(p - props.decayRate, props.minimumDecay);
				cursor = nextPoint(cursor, startAngle, p);
				q.push(queueObj(cursor, startAngle, p));
			}
			return g;

			function queueObj(point, angle, p) {
				if (point == null) return null;
				var da = Math.randomInRange(Math.PI * 0.25, Math.PI * 0.75);
				return {
					point,
					angle: Math.coinToss() ? angle + da : angle - da,
					p
				};
			}
		}

		/**
			nextPoint:
				Returns the next point, given a starting position and angle.
				Mark the grid squares along the way.
		*/
		function nextPoint(startPoint, startAngle, p) {
			var len = Math.interpolate([0, 1], [props.minLineLength, props.maxLineLength], p);
			var angleRange = Math.interpolate([0, 1], [Math.toRadians(props.maxAngle), Math.toRadians(props.minAngle)], p);
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

		/**
			extendTo:
				Extends a line from p1 towards p2, and either reaches p2, or hits an invalid point along the way and stops growing there.
				Return the point where it stopped.
		*/
		function extendTo(p1, p2) {
			p1 = centerInCell(p1);
			p2 = centerInCell(p2);
			var {
				numSteps,
				stepSize,
				theta
			} = getStepInfo(p1, p2);
			var start = getOrdinalPosition(p1);
			var cursor = p1;
			while (numSteps--) {
				var prev = cursor;
				cursor = Math.coordWithAngleAndDistance(prev, theta, stepSize);
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
			markLine:
				Given a line of two points, mark every square that the line crosses through.
				Do this by incrementally (according to the resolution) stepping through the line's trajectory and marking each square it enters.

				see Bresenham's algorithm
		*/
		function markLine(line) {
			var p0 = centerInCell(line[0]),
				p1 = centerInCell(line[1]);
			markPoint(p0);
			var {
				numSteps,
				stepSize,
				theta
			} = getStepInfo(p0, p1);
			var cursor = p0;
			while (numSteps--) {
				cursor = Math.coordWithAngleAndDistance(cursor, theta, stepSize);
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

		/**
			taper:
				This determines how thick a line is at any given point, based on the point's progess from the start of the line to the end of the line.
		*/
		function taper(p) {
			return Math.interpolate([0, 1], [props.maxLineWidth, props.minLineWidth], p);
		}

		/**
			getCartesianCoord:
		    	Given an ordinal position, return the corresponding cartesian location.

		    example: [0, 1] => (0.5, 1.5)
		*/
		function getCartesianCoord(i) {
			return i * squareSize - bound;
		}

		/**
			getOrdinalPosition:
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
			centerInCell:
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

		/**
			fillGridSquares:
				Color every square that is populated by a root line.
		*/
		function fillGridSquares() {
			for (let r = 0; r < resolution; r++) {
				for (let c = 0; c < resolution; c++) {
					if (grid[r][c]) {
						var x = getCartesianCoord(c),
							y = getCartesianCoord(r);
						DrawUtil.makeSquare(x, y, x + squareSize, y + squareSize);
					}
				}
			}
		}

		/**
			A convenience package, info relevant for incrementally stepping from one point to another.
		*/
		function getStepInfo(p1, p2) {
			var stepSize = squareSize / resolution;
			return {
				theta: Math.thetaFromTwoPoints(p1, p2),
				stepSize: stepSize,
				numSteps: Math.floor(Math.distance(p1, p2) / stepSize)
			};
		}
	}

	function inBounds(point) {
		return point != null && Math.distance(point, Util.centerVector) <= bound;
	}

	function drawGrid(resolution) {
		DrawUtil.drawGrid(bound, resolution, 0x0000ff);
	}

	function buildGrid(res) {
		var g = [];
		for (let i = 0; i < res; i++) {
			g.push([]);
			for (let j = 0; j < res; j++) {
				g[i].push(false);
			}
		}
		return g;
	}

	/**
		hasEmptySpaces:
			Returns true if there exists a single square that has not been populated.
	*/
	function hasEmptySpaces() {
		return grid.some(function (r) {
			return r.some(function (c) {
				return c === true;
			});
		});
	}
})();
