import { Vector3 } from 'three';
import { toRadians } from 'utils/Math';
import buildLine from './buildLine';
import hasEmptySpaces from './hasEmptySpaces';
import PriorityQueue from 'utils/PriorityQueue';

export default function createGeoms(props, bound, grid) {
  const q = new PriorityQueue('q');
  const initPoint = new Vector3(props.startX, props.startY);
  const initAngle = toRadians(props.startAngle);
  const geoms = [
    buildLine(q, initPoint, initAngle, 1, props, bound, grid)
  ];
  while (q.has() && hasEmptySpaces(grid, props.resolution)) {
    const n = q.pop();
    geoms.push(buildLine(q, n.point, n.angle, n.p, props, bound, grid));
  }
  return geoms;
}
