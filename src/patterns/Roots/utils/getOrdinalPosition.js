import getSquareSize from './getSquareSize'

/**
  getOrdinalPosition:
      Given a cartesian coordinate and the resolution,
      return the [row, col] pair that point lies in.
*/
export default function getOrdinalPosition(point, bound, resolution) {
  const squareSize = getSquareSize(bound, resolution)
  const x = point.x + bound
  const y = point.y + bound
  let r = Math.floor(y / squareSize)
  let c = Math.floor(x / squareSize)
  if (r < 0) r = 0
  if (c < 0) c = 0
  return { r, c }
}
