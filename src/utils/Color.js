import { Color } from 'three';
import { palette } from 'constants/Color';

const buildFromProps = p => p ? new Color(p.red, p.green, p.blue) : new Color();

export {
  palette,
  buildFromProps,
}
