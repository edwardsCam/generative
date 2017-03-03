window.addEventListener('load', function() {
	init();
	goThrottled(100);

	function animate() {
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
		pattern_snake.init();
	}
});
