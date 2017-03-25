/**
	mathUtil:
		Extensions to the Math class.
*/

Math.usingDegrees = false;
Math.PI_2 = Math.PI * 2;
Math.PI_half = Math.PI / 2;

Math.avg = function (a, b) {
	return (a + b) / 2;
};


/**
	toRadians:
		Given degrees, return radians.
*/
Math.toRadians = function (d) {
	return d * Math.PI / 180;
};

/**
	toDegrees:
		Given radians, return degrees.
*/
Math.toDegrees = function (r) {
	return r * 180 / Math.PI;
};

/**
	coordsFromTheta:
		Given an angle (from origin), return the coordinate at the given radius.
*/
Math.coordsFromTheta = function (theta, radius) {
	return {
		x: Math.cos(theta) * radius,
		y: Math.sin(theta) * radius
	};
};

/**
	thetaFromCoord:
		Given a coordinate, return its angle from origin.
*/
Math.thetaFromCoord = function (x, y) {
	if (y === undefined) { // handle different argument signatures
		if (_.isArray(x)) {
			y = x[1];
			x = x[0];
		} else if (_.isObject(x)) {
			y = x.y;
			x = x.x;
		}
	}
	return Math.PI + Math.atan2(-y, -x);
	/*
	    Thetas:
	            90 (pi/2)
	               |
	               |
	               |
	    180 ----------------- 0
	    (pi)       |
	               |
	               |
	              270
	           (3pi/2)


	*/
};

/**
    thetaFromTwoPoints:
        Given two points, get the angle they make from x-axis.
*/
Math.thetaFromTwoPoints = function (p1, p2) {
	var dy = p2.y - p1.y;
	var dx = p2.x - p1.x;
	return Math.atan2(dy, dx);
};

/**
	bound:
		Return the given value, constrained by a min and max.
*/
Math.bound = function (min, max, value) {
	if (value <= min) {
		return min;
	} else if (value >= max) {
		return max;
	} else {
		return value;
	}
};

/**
    distance:
        Gets the distance between two points.
*/
Math.distance = function (p1, p2) {
	var dy = p2.y - p1.y;
	var dx = p2.x - p1.x;
	return Math.sqrt(dy * dy + dx * dx);
};

/**
	normalizeScreenPos:
		Normalizes a screen position to [-1, 1]
*/
Math.normalizeScreenPos = function (x, y) {
	return {
		x: (x / window.innerWidth) * 2 - 1,
		y: -(y / window.innerHeight) * 2 + 1
	};
};

/**
	denormalizeScreenPos:
		Denormalizes a screen position from [-1, 1] to [0, (width or height)]
*/
Math.denormalizeScreenPos = function (x, y) {
	return {
		x: (x + 1) * window.innerWidth / 2,
		y: (y - 1) * window.innerHeight / 2
	};
};

/**
    interpolate:
        Linear interpolation between a domain and a range.
        Given a value, output where it will fit within these boundaries.

    @param {array} domain - Two values for min and max X.
    @param {array}  range - Two values for min and max Y.
    @param {number} value - The value to interpolate within the domain.

    Example:
        domain: [0, 10]
        range: [0, 100]
        value: 6
        output: 60
**/
Math.interpolate = function (domain, range, value) {
	var x1 = domain[0],
		x2 = domain[1],
		y1 = range[0],
		y2 = range[1];
	var min = Math.min(y1, y2),
		max = Math.max(y1, y2),
		result = y1 + ((y2 - y1) * (value - x1)) / (x2 - x1);
	return Math.bound(min, max, result);
};


/**
	interpolateSmooth:
		Sinusoidal interpolation between a domain and a range.
		Essentially the same as Math.interpolate, but with a softer transition.

        Like this:             rather than this:
                 ___
               /                  /
             /                   /
        ___/                    /
*/
Math.interpolateSmooth = function (domain, range, value) {
	var x1 = domain[0],
		x2 = domain[1],
		y1 = range[0],
		y2 = range[1];
	if (value > x2) return y2;
	if (value < x1) return y1;
	if (x1 === x2) return y1;

	var period = Math.PI / (x2 - x1),
		sinArg = (period * (value - x1)) - Math.PI_half,
		result = Math.interpolate([-1, 1], [y1, y2], Math.sin(sinArg)),
		min = Math.min(y1, y2),
		max = Math.max(y1, y2);
	return Math.bound(min, max, result);
};

/**
	randomInRange:
		Given a min and max, return a random within that range.

	@param {boolean} round - if true, return an integer (truncated)
*/
Math.randomInRange = function (min, max, round) {
	var result = min + Math.random() * (max - min);;
	return round ? Math.floor(result) : result;
};

/**
    coordWithAngleAndDistance:
        Given a point, an angle, and a distance, return the point you get from traveling <distance> units at <angle> degrees from <start>.

    Example:
        start: (0, 0)
        angle: 90
        distance: 3
        output: (0, 3)
*/
Math.coordWithAngleAndDistance = function (start, angle, distance) {
	var xdist = distance * Math.cos(angle);
	var ydist = distance * Math.sin(angle);
	return new THREE.Vector2(start.x + xdist, start.y + ydist);
};

/**
	coinToss:
		50% chance of returning true
*/
Math.coinToss = function () {
	return Math.random() > 0.5;
};

/**
	diff:
		Returns the absolute difference between two numbers.
*/
Math.diff = function (x, y) {
	return Math.abs(x - y);
};
