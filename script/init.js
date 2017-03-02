var app = (function() {
	return new App();

	function App() {
		var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		var renderer = new THREE.WebGLRenderer();
		var scene = new THREE.Scene();
		var geometry = new THREE.Geometry();
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.geometry = geometry;

		scene.add(new THREE.AmbientLight(Color.palette[1], 0.4));
		geometry.dynamic = true;
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(Color.palette[4], 1);
		camera.position.set(0, 0, 10);

		this.render = function() {
			renderer.render(scene, camera);
		};

		document.body.appendChild(this.renderer.domElement);
		window.addEventListener('resize', resizeWindow, false);

		function resizeWindow(e) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
	}
})();
