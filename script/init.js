var app = (function () {
	return new App();

	function App() {
		var self = this;
		self.scene = new THREE.Scene();
		self.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		self.renderer = new THREE.WebGLRenderer();
		self.clock = new THREE.Clock();
		self.time = {
			curr: 0,
			delta: function () {
				return self.clock.getDelta();
			}
		};
		self.activePattern = null;

		self.renderer.setSize(window.innerWidth, window.innerHeight);
		self.renderer.setClearColor(Color.palette[0], 1);
		self.camera.position.set(0, 0, 10);

		self.render = function () {
			self.renderer.render(self.scene, self.camera);
		};
		document.body.appendChild(self.renderer.domElement);
		window.addEventListener('resize', function (e) {
			self.camera.aspect = window.innerWidth / window.innerHeight;
			self.camera.updateProjectionMatrix();
			self.renderer.setSize(window.innerWidth, window.innerHeight);
			self.render();
		}, false);

		initGUI();

		function resetTime() {
			self.clock = new THREE.Clock();
			self.time.curr = 0;
		}

		function destroy() {
			while (self.scene.children.length) {
				var c = self.scene.children[0];
				_.result(c, 'geometry.dispose');
				_.result(c, 'material.dispose');
				self.scene.remove(c);
			}
		}

		function initGUI() {
			var patterns = [
				patConfig('Roots', pattern_roots),
				patConfig('Infinity Cycle', pattern_infinity_cycle),
				patConfig('Chipboard', pattern_chipboard)
			];
			var selectedPatternName;
			var defaultOptions = {
				Pattern: '',
				DRAW: drawFn
			};
			var curPatternCtrls = [];
			var customValues = getInitialValues();

			var gui = new dat.GUI();
			gui.add(defaultOptions, 'Pattern', _.map(patterns, 'name')).onChange(newVal => {
				customValues = getInitialValues();
				selectedPatternName = newVal;

				curPatternCtrls.forEach(ctrl => {
					try {
						gui.remove(ctrl);
					} catch (e) {
						console.warn('Failed to remove GUI component.');
						console.log(e);
					}
				});
				var selPatternOpts = _.get(customValues, selectedPatternName);
				curPatternCtrls = _.map(selPatternOpts, (val, prop) => {
					var ctrl = gui.add(selPatternOpts, prop, val);
					var refinedOpts = _.get(customValues.__meta__, selectedPatternName);
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

				self.activePattern = newPattern.ctrl;
				if (_.get(self, 'activePattern.init')) {
					self.activePattern.init(customValues[selectedPatternName]);
				}
			}

			function patConfig(name, ctrl) {
				return {
					name,
					ctrl
				};
			}

			function getInitialValues() {
				return {
					'Roots': _initial_values_Roots(),
					'Infinity Cycle': _initial_values_InfinityCycle(),
					'Chipboard': _initial_values_Chipboard(),
					'__meta__': {
						'Roots': _custom_options_Roots(),
						'Infinity Cycle': _custom_options_InfinityCycle(),
						'Chipboard': _custom_options_Chipboard()
					}
				};
			}

			function _initial_values_Roots() {
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
					drawTime: 0.02,
					resolution: 80,
					showGrid: false
				};
			}

			function _initial_values_InfinityCycle() {
				return {
					maxPoints: 600,
					rotateSpeed: 0.15,
					drawTime: 0.125,
					growthTime: 15,
					pointDistance: 0.5,
					vertical: true,
					likeWhoa: 2.5
				};
			}

			function _initial_values_Chipboard() {
				return {
					minBlankSpace: 0.15,
					minLineWidth: 0.015,
					maxLineWidth: 0.1,
					drawTime: 0.05,
					randomness: 1
				};
			}

			function _custom_options_Roots() {
				return {
					startX: bound(-3, 3, 0.25),
					startY: bound(-3, 3, 0.25),
					startAngle: bound(0, 360, 5),
					minLineLength: bound(0.05, 1, 0.05),
					maxLineLength: bound(0.1, 1, 0.05),
					minLineWidth: bound(0.01, 0.5, 0.01),
					maxLineWidth: bound(0.05, 0.5, 0.01),
					minAngle: bound(5, 90),
					maxAngle: bound(10, 175),
					decayRate: bound(0, 0.2, 0.01),
					minimumDecay: bound(0, 0.5, 0.05),
					drawTime: bound(0.001, 0.04, 0.001),
					resolution: bound(20, 300, 10)
				};
			}

			function _custom_options_InfinityCycle() {
				return {
					maxPoints: bound(20, 5000, 10),
					rotateSpeed: bound(0.02, 1, 0.02),
					drawTime: bound(0, 0.2, 0.02),
					growthTime: bound(0, 60, 5),
					pointDistance: bound(0.25, 1, 0.01),
					likeWhoa: bound(0, 5, 0.25)
				};
			}

			function _custom_options_Chipboard() {
				return {
					minBlankSpace: bound(0.05, 0.5, 0.0125),
					minLineWidth: bound(0.01, 0.1, 0.01),
					maxLineWidth: bound(0.02, 0.3, 0.02),
					drawTime: bound(0.00125, 0.1, 0.00125),
					randomness: bound(0, 1, 0.05)
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
