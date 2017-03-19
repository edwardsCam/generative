var pattern_infinity_cycle = (function () {

	var MAX_POINTS, n, infinityCycle, addPeriod, rotateSpeed, timeBuff;

	return {
		init: function () {
			n = 0;
			addPeriod = 0.2;
			addAccelerate = 0.001;
			rotateSpeed = 0.15;
			MAX_POINTS = 600;
			timeBuff = 0;
			infinityCycle = new InfinityCycle();
		},
		animate: function (d) {
			timeBuff += d;
			infinityCycle.animate();
		}
	};

	function InfinityCycle() {
		var points = new Float32Array(MAX_POINTS * 3),
			g = new THREE.BufferGeometry();
		g.addAttribute('position', new THREE.BufferAttribute(points, 3));
		app.scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({
			color: 'black'
		})));
		this.animate = function () {
			if (timeBuff > addPeriod) {
				timeBuff -= addPeriod;
				addPeriod -= addAccelerate;
				g.setDrawRange(0, ++n);
			}
			adjust();
		};

		function adjust() {
			var width = Math.interpolateSmooth([0, 15], [4, 2], app.time.curr),
				height = Math.interpolateSmooth([0, 15], [1, 4], app.time.curr);
			for (var i = 0; i < n; i++) {
				var j = app.time.curr * rotateSpeed + i;
				var p = i * 3;
				points[p] = width * Math.sin(2.5 * j);
				points[p + 1] = height * Math.sin(j);
			}
			g.attributes.position.needsUpdate = true;
		}
	}
})();
