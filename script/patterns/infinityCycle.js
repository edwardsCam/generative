var pattern_infinity_cycle = (function () {

	var n, timeBuff, infinityCycle;

	return {
		init: function (props) {
			n = 0;
			timeBuff = 0;
			infinityCycle = new InfinityCycle(props);
		},
		animate: function (d) {
			timeBuff += d;
			infinityCycle.animate();
		}
	};

	function InfinityCycle(props) {
		var points = new Float32Array(6000), // max points of 2000, *3 for xyz
			g = new THREE.BufferGeometry();
		g.addAttribute('position', new THREE.BufferAttribute(points, 3));
		app.scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({
			color: 'black'
		})));
		this.animate = function () {
			n = Math.min(n, props.maxPoints);
			while (n < props.maxPoints && timeBuff > props.newPointDelay) {
				timeBuff -= props.newPointDelay;
				n++;
			}
			g.setDrawRange(0, n);
			adjust();
		};

		function adjust() {
			var t = app.time.curr,
				isVert = props.vertical,
				timeDomain = [0, props.growthTime],
				width = Math.interpolateSmooth(timeDomain, isVert ? [4, 2] : [2, 5], t),
				height = Math.interpolateSmooth(timeDomain, isVert ? [1, 4] : [4, 3], t);
			for (var i = 0; i < n; i++) {
				var j = t * props.rotateSpeed + (i * props.pointDistance
);
				var p = i * 3;
				points[p] = width * Math.sin((isVert ? props.likeWhoa : 1) * j);
				points[p + 1] = height * Math.sin((isVert ? 1 : props.likeWhoa) * j);
			}
			g.attributes.position.needsUpdate = true;
		}
	}
})();
