/**
	miscUtil:
		Various utility functions and classes.
*/

var Util = (function () {

	return {
		resolution: resolutionFn,
		centerVector: new THREE.Vector3(),
		vec2toVec3: vec2toVec3,
		vec2Equals: vec2Equals,
		middleOfList: middleOfList,
		PriorityQueue: PriorityQueue
	};

	function resolutionFn() {
		return new THREE.Vector2(window.innerWidth, window.innerHeight);
	}

	function vec2toVec3(vec2, z) {
		return new THREE.Vector3(vec2.x, vec2.y, z);
	}

	function vec2Equals(p1, p2) {
		return p1.x === p2.x && p1.y === p2.y;
	}

	function middleOfList(list) {
		if (_.get(list, 'length')) {
			return list[Math.floor(list.length / 2)];
		}
		return null;
	}

	function PriorityQueue(priorityProp) {
		if (!(this instanceof PriorityQueue)) return new PriorityQueue(priorityProp);
		var dat = [];
		priorityProp = priorityProp || '';

		this.push = function (item) {
			if (!item) return;
			dat.push(item);
			bubbleUp();
		};
		this.pop = function () {
			if (!this.has()) return null;
			var ret = dat.shift();
			bubbleDown();
			return ret;
		};
		this.has = function () {
			return dat.length > 0;
		};

		function bubbleUp() {
			var i = dat.length - 1;
			while (i > 0) {
				var j = i >>> 1;
				if (isHigherPriority(i, j)) {
					swap(i, j);
					i = j;
				} else break;
			}
		}

		function bubbleDown() {
			var i = 0,
				last = dat.length - 1;
			while (true) {
				var left = (i << 1) + 1,
					right = left + 1,
					min = i;
				if (left <= last && isHigherPriority(left, min)) {
					min = left;
				}
				if (right <= last && isHigherPriority(right, min)) {
					min = right;
				}
				if (i === min) {
					break;
				} else {
					swap(i, min);
					i = min;
				}
			}
		}

		function swap(i1, i2) {
			var tmp = dat[i1];
			dat[i1] = dat[i2];
			dat[i2] = tmp;
		}

		/**
			Fitness function
		*/
		function isHigherPriority(i1, i2) {
			return _.get(dat[i1], priorityProp) > _.get(dat[i2], priorityProp);
		}
	}
})();
