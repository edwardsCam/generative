var app = (function () {
	var patterns = [{
		name: 'Roots',
		ctrl: pattern_roots
	}, {
		name: 'Infinity Cycle',
		ctrl: pattern_infinity_cycle
	}, {
		name: 'Chipboard',
		ctrl: pattern_chipboard
	}];
	return new App();

	function App() {
		var appObj = this;
		var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		var renderer = new THREE.WebGLRenderer();
		var geometry = new THREE.Geometry();
		var clock = new THREE.Clock();
		this.scene = new THREE.Scene();
		this.camera = camera;
		this.renderer = renderer;
		this.geometry = geometry;
		this.time = {
			curr: 0,
			delta: function () {
				return clock.getDelta();
			}
		};
		this.activePattern = null;

		geometry.dynamic = true;
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(Color.palette[0], 1);
		camera.position.set(0, 0, 10);

		this.render = function () {
			renderer.render(appObj.scene, camera);
		};

		document.body.appendChild(this.renderer.domElement);
		window.addEventListener('resize', resizeWindow, false);

		initGUI();

		function resizeWindow(e) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function resetTime() {
			clock = new THREE.Clock();
			appObj.time.curr = 0;
		}

		function destroy() {
			while (appObj.scene.children.length) {
				var c = appObj.scene.children[0];
				c.geometry.dispose();
				c.material.dispose();
				appObj.scene.remove(c);
			}
		}

		function initGUI() {
			var selectedPatternName;
			var defaultOptions = {
				Pattern: '',
				DRAW: drawFn
			};
			var curPatternCtrls = [];
			var customOptions = defaultValues();

			var gui = new dat.GUI();
			gui.add(defaultOptions, 'Pattern', _.map(patterns, 'name')).onChange(function (newVal) {
				customOptions = defaultValues();
				selectedPatternName = newVal;

				curPatternCtrls.forEach(function (ctrl) {
					try {
						gui.remove(ctrl);
					} catch (e) {
						console.warn('Failed to remove GUI component.');
						console.log(e);
					}
				});
				var selPatternOpts = _.get(customOptions, selectedPatternName);
				curPatternCtrls = _.map(selPatternOpts, function (val, prop) {
					var ctrl = gui.add(selPatternOpts, prop, val);
					var refinedOpts = _.get(customOptions.__meta__, selectedPatternName);
					if (refinedOpts) {
						var bound = _.get(refinedOpts, prop + '.bound');
						if (bound) {
							return ctrl.min(bound[0]).max(bound[1]).step(bound[2]);
						}
					}
					return ctrl;
				});
			});
			gui.add(defaultOptions, 'DRAW');

			function drawFn(newPatternName) {
				var newPattern = _.find(patterns, {
					name: selectedPatternName
				});
				if (!newPattern) return;

				resetTime();
				destroy();

				appObj.activePattern = newPattern.ctrl;
				if (_.get(appObj, 'activePattern.init')) {
					appObj.activePattern.init(customOptions[selectedPatternName]);
				}
			}

			function defaultValues() {
				return {
					'Roots': _default_values_Roots(),
					'Infinity Cycle': _default_values_InfinityCycle(),
					'Chipboard': _default_values_Chipboard(),
					'__meta__': {
						'Roots': _custom_options_Roots(),
						'Infinity Cycle': _custom_options_InfinityCycle(),
						'Chipboard': _custom_options_Chipboard()
					}
				};
			}

			function _default_values_Roots() {
				return {
					startX: 0.0,
					startY: 0.0,
					startAngle: 0,
					minLineLength: 0.1,
					maxLineLength: 0.3,
					minLineWidth: 0.03,
					maxLineWidth: 0.1,
					minAngle: 20,
					maxAngle: 100,
					decayRate: 0.04,
					minimumDecay: 0.2,
					resolution: 75
				};
			}

			function _default_values_InfinityCycle() {
				return {
					maxPoints: 600,
					rotateSpeed: 0.15,
					newPointDelay: 0.2,
					newPointAcceleration: 0.0005,
					growthTime: 15,
					vertical: true,
					likeWhoa: 2.5
				};
			}

			function _default_values_Chipboard() {
				return {
					minBlankSpace: 0.15,
					minLineWidth: 0.015,
					maxLineWidth: 0.1,
					drawTime: 0.05
				};
			}

			function _custom_options_Roots() {
				return {
					startX: bound(-3, 3, 0.25),
					startY: bound(-3, 3, 0.25),
					startAngle: bound(0, 360, 5),
					minLineLength: bound(0.05, 1, 0.05),
					maxLineLength: bound(0.1, 2, 0.05),
					minLineWidth: bound(0.01, 0.5, 0.01),
					maxLineWidth: bound(0.05, 1, 0.01),
					minAngle: bound(5, 90),
					maxAngle: bound(10, 175),
					decayRate: bound(0.01, 0.1, 0.01),
					minimumDecay: bound(0, 0.5, 0.05),
					resolution: bound(20, 200, 5)
				};
			}

			function _custom_options_InfinityCycle() {
				return {
					maxPoints: bound(50, 2000, 10),
					rotateSpeed: bound(0.05, 2, 0.05),
					newPointDelay: bound(0, 0.5, 0.05),
					newPointAcceleration: bound(0, 0.005, 0.0005),
					growthTime: bound(0, 60, 5),
					likeWhoa: bound(0, 10, 0.25)
				};
			}

			function _custom_options_Chipboard() {
				return {
					minBlankSpace: bound(0.05, 1, 0.05),
					minLineWidth: bound(0.01, 0.1, 0.01),
					maxLineWidth: bound(0.02, 0.3, 0.02),
					drawTime: bound(0, 0.1, 0.0025)
				};
			}

			function bound(min, max, step) {
				return {
					bound: [min, max, (step == null ? 1 : step)]
				};

			}
		}
	}
})();
