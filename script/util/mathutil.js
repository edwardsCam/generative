Math.usingDegrees = false;

// degrees to radians
Math.toRadians = function(d) {
	return d * Math.PI / 180;
};

// radians to degrees
Math.toDegrees = function(r) {
	return r * 180 / Math.PI;
};

// given an angle from origin, find the coordinate at the given radius
Math.coordsFromTheta = function(theta, radius) {
	if (Math.usingDegrees) theta = Math.toRadians(theta);
	return {
		x: Math.cos(theta) * radius,
		y: Math.sin(theta) * radius
	};
};

// given a coordinate, get its angle from origin
Math.thetaFromCoord = function(x, y) {
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
	return Math.usingDegrees ? Math.toDegrees(theta) : theta;
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

// normalizes a screen position to [-1, 1]
Math.normalizeScreenPos = function(x, y) {
	return {
		x: (x / window.innerWidth) * 2 - 1,
		y: -(y / window.innerHeight) * 2 + 1
	};
};

// denormalizes a screen position from [-1, 1] to [0, (width or height)]
Math.denormalizeScreenPos = function(x, y) {
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
Math.interpolate = function(domain, range, value) {
	var x1 = domain[0],
		x2 = domain[1],
		y1 = range[0],
		y2 = range[1];
	var min = Math.min(y1, y2),
		max = Math.max(y1, y2),
		result = y1 + ((y2 - y1) * (value - x1)) / (x2 - x1);
	if (result < min) return min;
	if (result > max) return max;
	return result;
};

Math.randomInRange = function(min, max, round) {
	var result = min + Math.random() * (max - min);;
	return round ? Math.floor(result) : result;
};
