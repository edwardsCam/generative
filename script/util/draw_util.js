/**
	drawUtil:
		Various utilities for drawing and THREE.js related stuff.
*/

var DrawUtil = (function () {

	return {
		makeLine: makeLine,
		makeMeshLine: makeMeshLine,
		makePoint: makePoint,
		makeSquare: makeSquare,
		makeGeometry: makeGeometry,
		drawGrid: drawGrid
	};

	/**
		makeLine:
			Given two points and a material, add the line to the scene.
	*/
	function makeLine(material, x1, y1, x2, y2) {
		var geometry = makeGeometry(x1, y1, x2, y2);
		app.scene.add(new THREE.Line(geometry, material));
	}

	/**
		makeSquare:
			Given a top-left and bottom-right corner, and a color, add the square to the scene.
	*/
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

	/**
		makeMeshLine:
			Create a MeshLine with a geometry and material.

		@param {function} taperFn - Returns the line width at a given percentage along the line. This function is called on every point on the line.
					Takes a single argument (p), which is a number from [0, 1], representing the percentage the point is from first -> last.
	*/
	function makeMeshLine(geometry, material, taperFn) {
		var line = new MeshLine();
		line.setGeometry(geometry, taperFn || function (p) {
			return 1;
		});
		app.scene.add(new THREE.Mesh(line.geometry, material));
	}

	/**
		makeGeometry:
			Returns a geometry of a single line between two points.
	*/
	function makeGeometry(x1, y1, x2, y2) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(x1, y1));
		geometry.vertices.push(new THREE.Vector3(x2, y2));
		return geometry;
	}

	function makePoint(x, y) {
		return {
			x: x,
			y: y
		};
	}

	/**
		drawGrid:
			Given a bound (distance from origin), and a resolution, draw lines to create a grid.
	*/
	function drawGrid(bound, resolution, c) {
		var m = new THREE.LineBasicMaterial({
			color: c
		});
		for (var i = 0; i <= resolution; i++) {
			var j = Math.interpolate([0, resolution], [-bound, bound], i);
			makeLine(m, j, -bound, j, bound);
			makeLine(m, -bound, j, bound, j);
		}
	}

})();
