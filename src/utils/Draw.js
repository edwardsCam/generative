import {
  Geometry,
  Line, LineBasicMaterial,
  Mesh, MeshBasicMaterial,
  Vector3, Face3,
  DoubleSide, FaceColors,
} from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import { interpolate } from 'utils/Math'

/**
  drawUtil:
    Various utilities for drawing and THREE.js related stuff.
*/

/**
  makeLine:
    Given two points and a material, add the line to the scene.
*/
function makeLine(material, x1, y1, x2, y2) {
  const geometry = makeGeometry(x1, y1, x2, y2)
  return new Line(geometry, material)
}

/**
  makeSquare:
    Given a top-left and bottom-right corner, and a color, add the square to the scene.
*/
function makeSquare(x1, y1, x2, y2, c, opacity) {
  if (c == null) c = 0x00ff00
  const geo = new Geometry()
  geo.vertices = [
    new Vector3(x1, y1),
    new Vector3(x2, y1),
    new Vector3(x2, y2),
    new Vector3(x1, y2),
    new Vector3(x1, y1),
  ]
  geo.faces = [
    new Face3(0, 1, 2),
    new Face3(0, 2, 3),
  ]

  return new Mesh(geo, new MeshBasicMaterial({
    color: c,
    side: DoubleSide,
    vertexColors: FaceColors,
    opacity,
    transparent: opacity != null,
  }))
}

/**
  makeMeshLine:
    Create a MeshLine with a geometry and material.

  @param {function} taperFn - Returns the line width at a given percentage along the line.
        This function is called on every point on the line.
        Takes a single argument (p), which is a number from [0, 1],
        representing the percentage the point is from first -> last.
*/
function makeMeshLine(geometry, materialProps, taperFn = (() => 1)) {
  const line = new MeshLine()
  line.setGeometry(geometry, taperFn)
  return new Mesh(line.geometry, new MeshLineMaterial(materialProps))
}

/**
  makeGeometry:
    Returns a geometry of a single line between two points.
*/
function makeGeometry(x1, y1, x2, y2, w, color) {
  const geometry = new Geometry()
  geometry.vertices = [
    new Vector3(x1, y1),
    new Vector3(x2, y2),
  ]
  if (w != null) {
    geometry.lineWidth = w
  }
  if (color) {
    geometry.color = color
  }
  return geometry
}

const makePoint = (x, y) => ({ x, y })

/**
  drawGrid:
    Given a bound (distance from origin), and a resolution, draw lines to create a grid.
*/
function drawGrid(bound, resolution, color) {
  const m = new LineBasicMaterial({ color })
  for (let i = 0; i <= resolution; i++) {
    const j = interpolate([0, resolution], [-bound, bound], i)
    makeLine(m, j, -bound, j, bound)
    makeLine(m, -bound, j, bound, j)
  }
}

export {
  makeLine,
  makeSquare,
  makeMeshLine,
  makeGeometry,
  makePoint,
  drawGrid,
}
