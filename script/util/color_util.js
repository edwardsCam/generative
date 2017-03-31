var Color = (function () {
	var palette = [
		0xb1bcc3,
		0x1a1913,
		0x503815,
		0xac420d,
		0xff8105
	];
	return {
		palette,
		buildFromProps
	};

	function buildFromProps(p) {
		return new THREE.Color(p.red, p.green, p.blue);
	}
})();
