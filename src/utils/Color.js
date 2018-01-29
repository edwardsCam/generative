import { Color } from 'three';
import { palette } from 'constants/Color';

function buildColorFromProps(p) {
  if (p) {
    return new Color(p.red / 255, p.green / 255, p.blue / 255)
  }
  return new Color();
}

export {
  palette,
  buildColorFromProps,
}
