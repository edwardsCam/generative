window.addEventListener('load', function () {
	app.render();
	go();

	function animate() {
		if (!app.activePattern) return;

		var delta = app.time.delta();
		clockTick(delta);
		if (app.activePattern.isStatic) {
			if (!app.activePattern.isDrawn()) {
				app.activePattern.animate(delta);
				app.render();
			}
		} else {
			app.activePattern.animate(delta);
			app.render();
		}
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

	function clockTick(d) {
		app.time.curr += d;
	}
});
