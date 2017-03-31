var pattern_infinity_cycle = (function () {

	var n, timeBuff, infinityCycle;

	return {
		init(props) {
			n = 0;
			timeBuff = 0;
			infinityCycle = new InfinityCycle(props);
		},
		animate(d) {
			timeBuff += d;
			infinityCycle.animate();
		}
	};

	function InfinityCycle(props) {
		var points = new Float32Array(15000), // max points of 5000, *3 for xyz
			g = new THREE.BufferGeometry();
		g.addAttribute('position', new THREE.BufferAttribute(points, 3));
		var line = new THREE.Line(g, new THREE.LineBasicMaterial({
			color: Color.buildFromProps(props)
		}));
		app.scene.add(line);
		this.animate = function () {
			n = Math.min(n, props.maxPoints);
			while (n < props.maxPoints && timeBuff > props.drawTime) {
				timeBuff -= props.drawTime;
				n++;
			}
			g.setDrawRange(0, n);
			adjust();
			line.material.color = Color.buildFromProps(props);
			line.material.needsUpdate = true;
		};

		function adjust() {
			var t = app.time.curr,
				isVert = props.vertical,
				timeDomain = [0, props.growthTime],
				width = Math.interpolateSmooth(timeDomain, isVert ? [4, 2] : [2, 5], t),
				height = Math.interpolateSmooth(timeDomain, isVert ? [1, 4] : [4, 3], t);
			for (let i = 0; i < n; i++) {
				var j = t * props.rotateSpeed + (i * props.pointDistance);
				var p = i * 3;
				points[p] = width * Math.sin((isVert ? props.likeWhoa : 1) * j);
				points[p + 1] = height * Math.sin((isVert ? 1 : props.likeWhoa) * j);
			}
			g.attributes.position.needsUpdate = true;
		}
	}
})();
