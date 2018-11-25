import getOrdinalPosition from './getOrdinalPosition'
import getSquareSize from './getSquareSize'

/**
  centerInCell:
      Given a coordinate, adjust it so it's exactly in the center of its cell.
*/
export default function centerInCell(point, resolution, bound) {
  const { r, c } = getOrdinalPosition(point, bound, resolution)

  const squareSize = getSquareSize(bound, resolution)
  point.x = center(c, squareSize, bound)
  point.y = center(r, squareSize, bound)
  return point
}

const center = (p, squareSize, bound) => (
  (p * squareSize + (squareSize / 2)) - bound
)
