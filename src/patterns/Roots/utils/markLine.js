import { coordWithAngleAndDistance } from 'utils/Math'
import centerInCell from './centerInCell'
import getOrdinalPosition from './getOrdinalPosition'
import getStepInfo from './getStepInfo'

/**
  markLine:
    Given a line of two points, mark every square that the line crosses through.
    Do this by incrementally (according to the resolution) stepping through the line's
    trajectory and marking each square it enters.
    see Bresenham's algorithm
*/
export default function markLine(line, resolution, bound, grid) {
  const p0 = centerInCell(line[0], resolution, bound)
  const p1 = centerInCell(line[1], resolution, bound)
  markPoint(p0)
  const stepInfo = getStepInfo(p0, p1, bound, resolution)
  let { numSteps } = stepInfo
  const { stepSize, theta } = stepInfo
  let cursor = p0
  while (numSteps--) {
    cursor = coordWithAngleAndDistance(cursor, theta, stepSize)
    markPoint(cursor)
  }

  function markPoint(p) {
    const { r, c } = getOrdinalPosition(p, bound, resolution)
    if (r < resolution && c < resolution && !grid[r][c]) {
      grid[r][c] = true
      grid.count++
    }
  }
}
