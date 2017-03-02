var Util = (function() {

	return {
		makeLine: makeLine,
		makePoint: makePoint,
		makeRandomPointInRange: makeRandomPointInRange,
		diff: diff,
		inBound: inBound
	};

	function makeLine(material, x1, y1, x2, y2) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(x1, y1, 0));
		geometry.vertices.push(new THREE.Vector3(x2, y2, 0));
		app.scene.add(new THREE.Line(geometry, material));
	}

	function makePoint(x, y) {
		return {
			x: x,
			y: y
		};
	}

	function makeRandomPointInRange(min, max) {
		return makePoint(Math.randomInRange(min, max), Math.randomInRange(min, max));
	}

	function diff(x, y) {
		return Math.abs(x - y);
	}

	function inBound(x, min, max) {
		return x >= min && x <= max;
	}
})();
