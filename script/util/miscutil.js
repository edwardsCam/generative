var Util = (function() {

	return {
		diff: diff,
		inBound: inBound
	};

	function diff(x, y) {
		return Math.abs(x - y);
	}

	function inBound(x, min, max) {
		return x >= min && x <= max;
	}
})();
