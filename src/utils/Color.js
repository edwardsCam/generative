import { Color } from 'three';

function buildColorFromProps(p) {
  return p ? new Color(p.red / 255, p.green / 255, p.blue / 255) : new Color();
}

export {
  buildColorFromProps,
}
