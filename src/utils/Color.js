import { Color } from 'three';
import { palette } from 'constants/Color';

function buildColorFromProps(p) {
  return p ? new Color(p.red / 255, p.green / 255, p.blue / 255) : new Color();
}

export {
  palette,
  buildColorFromProps,
}
