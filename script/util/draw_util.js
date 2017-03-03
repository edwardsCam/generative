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

	function makeMeshLine(x1, y1, x2, y2, width) {
		var line = new MeshLine();
		line.setGeometry(makeGeometry(x1, y1, x2, y2)
			/*, function(p) {
						return 1;
					}*/
		);
		var mesh = new THREE.Mesh(line.geometry, new MeshLineMaterial({
			resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
			lineWidth: width,
			sizeAttenuation: 1,
			color: new THREE.Color(Color.palette[1])
		}));
		app.scene.add(mesh);
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
