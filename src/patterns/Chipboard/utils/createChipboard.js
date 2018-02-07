import { makeGeometry } from 'utils/Draw';
import { diff, interpolate, randomInRange } from 'utils/Math';
import createBoundaryLines from './createBoundaryLines';

export default function createChipboard(bound, props) {
  return createBoundaryLines(bound, props).concat(
    recurse(-bound, -bound, bound, bound, props.maxLineWidth - props.lineWidthSub, props)
  );
}

function recurse(min_x, min_y, max_x, max_y, w, props) {
  const dx = diff(min_x, max_x);
  const dy = diff(min_y, max_y);
  const { minBlankSpace, minLineWidth } = props;
  if (dx < minBlankSpace || dy < minBlankSpace) return [];
  if (w < minLineWidth) w = minLineWidth;

  const vBound = rir(min_x, max_x, props.randomness);
  const hBound = rir(min_y, max_y, props.randomness);

  const botLeft = () => recurse(min_x, min_y, vBound, hBound, w, props);
  const botRight = () => recurse(vBound, min_y, max_x, hBound, w, props);
  const topRight = () => recurse(vBound, hBound, max_x, max_y, w, props);
  const topLeft = () => recurse(min_x, hBound, vBound, max_y, w, props);

  return [
    makeGeometry(vBound, min_y, vBound, max_y, w),
    makeGeometry(min_x, hBound, max_x, hBound, w),
  ].concat(botLeft()).concat(botRight()).concat(topRight()).concat(topLeft());
}

function rir(min, max, randomness) {
  const middle = (min + max) / 2;
  return randomInRange(
    interpolate([0, 1], [middle, min], randomness),
    interpolate([0, 1], [middle, max], randomness)
  );
}
