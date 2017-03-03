var DrawUtil = (function() {

	return {
		makeLine: makeLine,
		makeMeshLine: makeMeshLine,
		makePoint: makePoint
	};

	function makeLine(material, x1, y1, x2, y2) {
		var geometry = makeGeometry(x1, y1, x2, y2);
		app.scene.add(new THREE.Line(geometry, material));
	}

	function makeMeshLine(geometry, material, taperFn) {
		var line = new MeshLine();
		line.setGeometry(geometry, taperFn || function() {
			return 1;
		});
		app.scene.add(new THREE.Mesh(line.geometry, material));
	}

	function makeGeometry(x1, y1, x2, y2) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(x1, y1, 0));
		geometry.vertices.push(new THREE.Vector3(x2, y2, 0));
		return geometry;
	}

	function makePoint(x, y) {
		return {
			x: x,
			y: y
		};
	}

})();
