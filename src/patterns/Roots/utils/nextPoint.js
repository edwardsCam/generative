import {
  interpolate, randomInRange, coordWithAngleAndDistance,
  toRadians,
} from 'utils/Math'
import { vec2Equals, vec2toVec3 } from 'utils/Misc'
import extendTo from './extendTo'
import markLine from './markLine'

/**
  nextPoint:
    Returns the next point, given a starting position and angle.
    Mark the grid squares along the way.
*/
export default function nextPoint(startPoint, startAngle, p, props, bound, grid) {
  const len = interpolate([0, 1], [props.minLineLength, props.maxLineLength], p)
  const angleRange = interpolate([0, 1], [toRadians(props.maxAngle), toRadians(props.minAngle)], p)
  const angle = randomInRange(-angleRange, angleRange) + startAngle
  let newPoint = coordWithAngleAndDistance(startPoint, angle, len)
  newPoint = extendTo(startPoint, newPoint, props.resolution, bound, grid)
  if (vec2Equals(startPoint, newPoint)) {
    newPoint = null
  } else {
    newPoint = vec2toVec3(newPoint)
    markLine([startPoint, newPoint], props.resolution, bound, grid)
  }
  return newPoint
}
