var Util = (function() {

	return {
		diff: diff,
		inBound: inBound,
		resolution: resolutionFn
	};

	function diff(x, y) {
		return Math.abs(x - y);
	}

	function inBound(x, min, max) {
		return x >= min && x <= max;
	}

	function resolutionFn() {
		return new THREE.Vector2(window.innerWidth, window.innerHeight);
	}
})();
