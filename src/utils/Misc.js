import { Vector2, Vector3 } from 'three';
import { get } from 'lodash';

/**
  miscUtil:
    Various utility functions and classes.
*/

function resolution() {
  return new Vector2(window.innerWidth, window.innerHeight);
}

function vec2toVec3(vec2, z) {
  return new Vector3(vec2.x, vec2.y, z);
}

function vec2Equals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

function middleOfList(list) {
  if (get(list, 'length')) {
    return list[Math.floor(list.length / 2)];
  }
  return null;
}

const centerVector = new Vector2();

export {
  resolution,
  vec2toVec3,
  vec2Equals,
  middleOfList,
  centerVector,
}
