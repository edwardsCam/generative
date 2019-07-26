import { makeGeometry, makeSquare } from 'utils/Draw'
import { diff, interpolate, randomInRange } from 'utils/Math'
import createBoundaryLines from './createBoundaryLines'
import { Color } from 'three'

export default function createChipboard(bound, props) {
  return createBoundaryLines(bound, props).concat(
    recurse(-bound, -bound, bound, bound, props, new Color(0, 0, 0)),
  )
}

function recurse(minX, minY, maxX, maxY, props, color) {
  const dx = diff(minX, maxX)
  const dy = diff(minY, maxY)
  const { minBlankSpace } = props
  if (dx < minBlankSpace || dy < minBlankSpace) return []

  const xSplit = rir(minX, maxX, props.randomness)
  const ySplit = rir(minY, maxY, props.randomness)

  const botLeft = () => recurse(minX, minY, xSplit, ySplit, props, new Color(parseInt(props.colorBL, 16)))
  const botRight = () => recurse(xSplit, minY, maxX, ySplit, props, new Color(parseInt(props.colorBR, 16)))
  const topRight = () => recurse(xSplit, ySplit, maxX, maxY, props, new Color(parseInt(props.colorTR, 16)))
  const topLeft = () => recurse(minX, ySplit, xSplit, maxY, props, new Color(parseInt(props.colorTL, 16)))

  return [
    makeSquare(minX, minY, xSplit, ySplit, color, 0.25),
    makeSquare(xSplit, minY, maxX, ySplit, color, 0.25),
    makeSquare(xSplit, ySplit, maxX, maxY, color, 0.25),
    makeSquare(minX, ySplit, xSplit, maxY, color, 0.25),
    ...botLeft(),
    ...botRight(),
    ...topRight(),
    ...topLeft(),
  ]
}

function rir(min, max, randomness) {
  const middle = (min + max) / 2
  return randomInRange(
    interpolate([0, 1], [middle, min], randomness),
    interpolate([0, 1], [middle, max], randomness),
  )
}
