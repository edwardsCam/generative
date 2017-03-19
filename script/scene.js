window.addEventListener('load', function () {
	init();
	go();

	function animate() {
		var delta = app.time.delta();
		clockTick(delta)
		pattern_infinity_cycle.animate(delta);
		app.render();
	}

	// renders the view every frame
	function go() {
		animate();
		requestAnimationFrame(go);
	}

	function goThrottled(interval) {
		animate();
		setInterval(animate, interval);
	}

	function init() {
		pattern_infinity_cycle.init();
	}

	function clockTick(d) {
		app.time.curr += d;
	}
});
