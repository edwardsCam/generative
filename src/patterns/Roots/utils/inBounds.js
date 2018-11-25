import { distance } from 'utils/Math'
import { centerVector } from 'utils/Misc'

const inBounds = (point, bound) => (
  point != null && distance(point, centerVector) <= bound
)

export default inBounds
