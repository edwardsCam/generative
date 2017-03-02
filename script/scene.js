window.addEventListener('load', function() {
	//go();
	goThrottled(100);

	function animate() {
		clocktick();
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

	// increment counters and get the delta since last tick
	function clocktick() {
		app.time.curr = app.clock.elapsedTime;
		app.time.currRounded = Math.floor(app.time.curr);
		app.time.delta = app.clock.getDelta();
	}
});
