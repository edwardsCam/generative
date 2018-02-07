import { coordWithAngleAndDistance } from 'utils/Math';
import centerInCell from './centerInCell';
import getOrdinalPosition from './getOrdinalPosition';
import getStepInfo from './getStepInfo';
import inBounds from './inBounds';

/**
  extendTo:
    Extends a line from p1 towards p2, and either reaches p2, or hits an invalid point along the way and stops growing there.
    Return the point where it stopped.
*/
export default function extendTo(p1, p2, resolution, bound, grid) {
  p1 = centerInCell(p1, resolution, bound);
  p2 = centerInCell(p2, resolution, bound);
  let {
    numSteps,
    stepSize,
    theta
  } = getStepInfo(p1, p2, bound, resolution);
  const start = getOrdinalPosition(p1, bound, resolution);
  let cursor = p1;
  while (numSteps--) {
    const prev = cursor;
    cursor = coordWithAngleAndDistance(prev, theta, stepSize);
    if (!isValidPoint(cursor)) {
      return centerInCell(prev, resolution, bound);
    }
  }
  return centerInCell(p2, resolution, bound);

  function isValidPoint(p) {
    if (!inBounds(p, bound)) return false;
    const { r, c } = getOrdinalPosition(p, bound, resolution);
    return (r == start.r && c == start.c) || !grid[r][c];
  }
}
