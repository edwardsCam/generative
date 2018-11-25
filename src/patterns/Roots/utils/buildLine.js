import { Geometry } from 'three'
import queueObj from './queueObj'
import centerInCell from './centerInCell'
import nextPoint from './nextPoint'
import inBounds from './inBounds'

/**
  buildLine:
    Constructs a single geometry, which represents a single branch path.
*/
export default function buildLine(q, root, startAngle, p, props, bound, grid) {
  const g = new Geometry()
  g.initLineWidth = p
  root = centerInCell(root, props.resolution, bound)
  g.vertices = [root]
  let cursor = nextPoint(root, startAngle, p, props, bound, grid)
  while (inBounds(cursor, bound)) {
    g.vertices.push(cursor)
    p = Math.max(p - props.decayRate, props.minimumDecay)
    cursor = nextPoint(cursor, startAngle, p, props, bound, grid)
    q.push(queueObj(cursor, startAngle, p))
  }
  return g
}
