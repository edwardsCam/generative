var DrawUtil = (function () {

	return {
		makeLine: makeLine,
		makeMeshLine: makeMeshLine,
		makePoint: makePoint,
		makeSquare: makeSquare,
		drawGrid: drawGrid
	};

	function makeLine(material, x1, y1, x2, y2) {
		var geometry = makeGeometry(x1, y1, x2, y2);
		app.scene.add(new THREE.Line(geometry, material));
	}

	function makeSquare(x0, y0, x1, y1, c) {
		if (_.isNil(c)) c = 0x00ff00;
		var geo = new THREE.Geometry();
		var material = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			side: THREE.DoubleSide,
			vertexColors: THREE.FaceColors
		});
		geo.vertices.push(new THREE.Vector3(x0, y0, -0.0001));
		geo.vertices.push(new THREE.Vector3(x1, y0, -0.0001));
		geo.vertices.push(new THREE.Vector3(x1, y1, -0.0001));
		geo.vertices.push(new THREE.Vector3(x0, y1, -0.0001));
		geo.vertices.push(new THREE.Vector3(x0, y0, -0.0001));

		geo.faces.push(new THREE.Face3(0, 1, 2));
		geo.faces.push(new THREE.Face3(0, 2, 3));

		app.scene.add(new THREE.Mesh(geo, material));
	}

	function drawGrid(bound, resolution, c) {
		var m = new THREE.LineBasicMaterial({
			color: c
		});
		for (var i = 0; i <= resolution; i++) {
			var j = Math.interpolate([0, resolution], [-bound, bound], i);
			DrawUtil.makeLine(m, j, -bound, j, bound);
			DrawUtil.makeLine(m, -bound, j, bound, j);
		}
	}

	function makeMeshLine(geometry, material, taperFn) {
		var line = new MeshLine();
		line.setGeometry(geometry, taperFn || function () {
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
