import { makeGeometry } from 'utils/Draw'
import { diff, interpolate, randomInRange } from 'utils/Math'
import createBoundaryLines from './createBoundaryLines'

export default function createChipboard(bound, props) {
  return createBoundaryLines(bound, props).concat(
    recurse(-bound, -bound, bound, bound, props.maxLineWidth - props.lineWidthSub, props),
  )
}

function recurse(minX, minY, maxX, maxY, w, props) {
  const dx = diff(minX, maxX)
  const dy = diff(minY, maxY)
  const { minBlankSpace, minLineWidth } = props
  if (dx < minBlankSpace || dy < minBlankSpace) return []
  if (w < minLineWidth) w = minLineWidth

  const vBound = rir(minX, maxX, props.randomness)
  const hBound = rir(minY, maxY, props.randomness)

  const botLeft = () => recurse(minX, minY, vBound, hBound, w, props)
  const botRight = () => recurse(vBound, minY, maxX, hBound, w, props)
  const topRight = () => recurse(vBound, hBound, maxX, maxY, w, props)
  const topLeft = () => recurse(minX, hBound, vBound, maxY, w, props)

  return [
    makeGeometry(vBound, minY, vBound, maxY, w),
    makeGeometry(minX, hBound, maxX, hBound, w),
  ].concat(botLeft()).concat(botRight()).concat(topRight()).concat(topLeft())
}

function rir(min, max, randomness) {
  const middle = (min + max) / 2
  return randomInRange(
    interpolate([0, 1], [middle, min], randomness),
    interpolate([0, 1], [middle, max], randomness),
  )
}
