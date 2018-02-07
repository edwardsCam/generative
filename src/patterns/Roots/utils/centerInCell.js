import getOrdinalPosition from './getOrdinalPosition';
import getSquareSize from './getSquareSize';

/**
  centerInCell:
      Given a coordinate, adjust it so it's exactly in the center of its cell.
*/
export default function centerInCell(point, resolution, bound) {
  const { r, c } = getOrdinalPosition(point, bound, resolution);

  point.x = center(c);
  point.y = center(r);
  return point;

  function center(p) {
    const squareSize = getSquareSize(bound, resolution);
    return (p * squareSize + (squareSize / 2)) - bound;
  }
}
