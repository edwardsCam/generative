var pattern_snake = (function () {

	var minLineWidth = 0.01;
	var maxLineWidth = 0.75;
	var pmin = 0.1;
	var decayRate = 1.1;
	var range = 3;

	return {
		init() {
			(new Snake()).draw();
		}
	};

	function Snake() {
		this.draw = function () {
			DrawUtil.makeMeshLine(buildGeometry(), new MeshLineMaterial({
				resolution: Util.resolution(),
				lineWidth: 1,
				sizeAttenuation: 1,
				color: new THREE.Color(Color.palette[1])
			}), taper);
		};

		function buildGeometry() {
			var p = 1;
			var geometry = new THREE.Geometry();
			while (p >= pmin) {
				geometry.vertices.push(new THREE.Vector3(
					Math.randomInRange(-range, range),
					Math.randomInRange(-range, range),
					Math.randomInRange(-range, range)
				));
				p /= decayRate;
			}
			return geometry;
		}
	}

	function taper(p) {
		return Math.interpolate([0, 1], [maxLineWidth, minLineWidth], p);
	}
})();
