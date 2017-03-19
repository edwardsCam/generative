Math.usingDegrees = false;

// degrees to radians
Math.toRadians = function (d) {
	return d * Math.PI / 180;
};

// radians to degrees
Math.toDegrees = function (r) {
	return r * 180 / Math.PI;
};

Math.degreeSystem = function (theta) {
	return Math.usingDegrees ? Math.toDegrees(theta) : theta;
};

// given an angle from origin, find the coordinate at the given radius
Math.coordsFromTheta = function (theta, radius) {
	if (Math.usingDegrees) theta = Math.toRadians(theta);
	return {
		x: Math.cos(theta) * radius,
		y: Math.sin(theta) * radius
	};
};

Math.bound = function (min, max, value) {
	if (value <= min) {
		return min;
	} else if (value >= max) {
		return max;
	} else {
		return value;
	}
};

// given a coordinate, get its angle from origin
Math.thetaFromCoord = function (x, y) {
	if (y === undefined) {
		if (_.isArray(x)) {
			y = x[1];
			x = x[0];
		} else if (_.isObject(x)) {
			y = x.y;
			x = x.x;
		}
	}
	var theta = Math.PI + Math.atan2(-y, -x);
	return Math.degreeSystem(theta);
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
    distance:
        Gets the distance between two points.
*/
Math.distance = function (p1, p2) {
	var dy = p2.y - p1.y;
	var dx = p2.x - p1.x;
	return Math.sqrt(dy * dy + dx * dx);
};

// normalizes a screen position to [-1, 1]
Math.normalizeScreenPos = function (x, y) {
	return {
		x: (x / window.innerWidth) * 2 - 1,
		y: -(y / window.innerHeight) * 2 + 1
	};
};

// denormalizes a screen position from [-1, 1] to [0, (width or height)]
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

Math.mod = function (val, mod) {
	return val % mod;
};

/**
    50% chance of returning true
*/
Math.coinToss = function () {
	return Math.random() > 0.5;
};

Math.avg = function (a, b) {
	return (a + b) / 2;
};
