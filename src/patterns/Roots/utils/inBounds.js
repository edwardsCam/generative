import { distance } from 'utils/Math';
import { centerVector } from 'utils/Misc';

export default function inBounds(point, bound) {
  return point != null && distance(point, centerVector) <= bound;
}
