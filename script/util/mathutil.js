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

// uses two points to build a line function,
// then interpolates the result at the given value
Math.twoPoint = function(value, x1, y1, x2, y2) {
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
