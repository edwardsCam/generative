var Util = (function () {

	return {
		diff: diff,
		inBound: inBound,
		resolution: resolutionFn,
		centerVector: centerVector,
		vec2toVec3: vec2toVec3,
		vec2Equals: vec2Equals,
		middleOfList: middleOfList
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

	function centerVector() {
		return new THREE.Vector3();
	}

	function vec2toVec3(vec2, z) {
		return new THREE.Vector3(vec2.x, vec2.y, z);
	}

	function vec2Equals(p1, p2) {
		return p1.x === p2.x && p1.y === p2.y;
	}

	function middleOfList(list) {
		if (list && list.length) {
			return list[Math.floor(list.length / 2)];
		}
		return null;
	}
})();
