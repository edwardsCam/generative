import { Vector2 } from 'three'

/**
  mathUtil:
    Extensions to the Math class.
*/

Math.TWO_PI = Math.PI * 2
Math.HALF_PI = Math.PI / 2

const toRadians = d => d * Math.PI / 180
const toDegrees = r => r * 180 / Math.PI

/**
  coordsFromTheta:
    Given an angle (from origin), return the coordinate at the given radius.
*/
function coordsFromTheta(theta, radius) {
  return {
    x: Math.cos(theta) * radius,
    y: Math.sin(theta) * radius,
  }
}

/**
    thetaFromTwoPoints:
        Given two points, get the angle they make from x-axis.
*/
function thetaFromTwoPoints(p1, p2) {
  const dy = p2.y - p1.y
  const dx = p2.x - p1.x
  return Math.atan2(dy, dx)
}

/**
  clamp:
    Return the given value, constrained by a min and max.
*/
function clamp(min, max, value) {
  if (value <= min) {
    return min
  } else if (value >= max) {
    return max
  } else {
    return value
  }
}

/**
    distance:
        Gets the distance between two points.
*/
function distance(p1, p2) {
  const dy = p2.y - p1.y
  const dx = p2.x - p1.x
  return Math.sqrt(dy * dy + dx * dx)
}

/**
  normalizeScreenPos:
    Normalizes a screen position to [-1, 1]
*/
const normalizeScreenPos = (x, y) => ({
  x: (x / window.innerWidth) * 2 - 1,
  y: -(y / window.innerHeight) * 2 + 1,
})

/**
  denormalizeScreenPos:
    Denormalizes a screen position from [-1, 1] to [0, (width or height)]
*/
const denormalizeScreenPos = (x, y) => ({
  x: (x + 1) * window.innerWidth / 2,
  y: (y - 1) * window.innerHeight / 2,
})

/**
    interpolate:
        Linear interpolation between a domain and a range.
        Given a value, output where it will fit within these boundaries.

    @param {array} domain - Two values for min and max X.
    @param {array}  range - Two values for min and max Y.
    @param {number} value - The value to interpolate within the domain.

    Example:
        domain: [0, 10]
        range: [0, 100]
        value: 6
        output: 60
* */
function interpolate(domain, range, value) {
  const x1 = domain[0]
  const x2 = domain[1]
  const y1 = range[0]
  const y2 = range[1]
  const min = Math.min(y1, y2)
  const max = Math.max(y1, y2)
  const result = y1 + ((y2 - y1) * (value - x1)) / (x2 - x1)
  return clamp(min, max, result)
}


/**
  interpolateSmooth:
    Sinusoidal interpolation between a domain and a range.
    Essentially the same as interpolate, but with a softer transition.

        Like this:             rather than this:
                 ___
               /                  /
             /                   /
        ___/                    /
*/
function interpolateSmooth({ domain, range, value }) {
  const x1 = domain[0]
  const x2 = domain[1]
  const y1 = range[0]
  const y2 = range[1]
  if (value > x2) return y2
  if (value < x1) return y1
  if (x1 === x2) return y1

  const period = Math.PI / (x2 - x1)
  const sinArg = (period * (value - x1)) - Math.HALF_PI
  const result = interpolate([-1, 1], [y1, y2], Math.sin(sinArg))
  const min = Math.min(y1, y2)
  const max = Math.max(y1, y2)
  return clamp(min, max, result)
}

/**
  randomInRange:
    Given a min and max, return a random within that range.

  @param {boolean} round - if true, return an integer (truncated)
*/
function randomInRange(min, max, round) {
  const result = min + Math.random() * (max - min)
  return round ? Math.floor(result) : result
}

/**
    coordWithAngleAndDistance:
        Given a point, an angle, and a distance,
        return the point you get from traveling <distance> units at <angle> degrees from <start>.

    Example:
        start: (0, 0)
        angle: 90
        distance: 3
        output: (0, 3)
*/
function coordWithAngleAndDistance(start, angle, distanceFromCenter) {
  const xdist = distanceFromCenter * Math.cos(angle)
  const ydist = distanceFromCenter * Math.sin(angle)
  return new Vector2(start.x + xdist, start.y + ydist)
}

/**
  coinToss:
    50% chance of returning true
*/
const coinToss = () => Math.random() > 0.5

/**
  diff:
    Returns the absolute difference between two numbers.
*/
const diff = (x, y) => Math.abs(x - y)

function percentWithinRange(min, max, value) {
  const result = (value - min) / (max - min)
  return clamp(0, 1, result)
}

function valueFromPercent(min, max, percent) {
  const result = (max - min) * percent + min
  return clamp(min, max, result)
}

function smoothToStep(value, step) {
  if (!step) return value
  return step * Math.round(value / step)
}

export {
  clamp,
  diff,
  distance,
  toRadians,
  toDegrees,
  normalizeScreenPos,
  denormalizeScreenPos,
  coordsFromTheta,
  thetaFromTwoPoints,
  interpolate,
  interpolateSmooth,
  randomInRange,
  coordWithAngleAndDistance,
  coinToss,
  percentWithinRange,
  valueFromPercent,
  smoothToStep,
}
