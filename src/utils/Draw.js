import {
  Geometry,
  Line, LineBasicMaterial,
  Mesh, MeshBasicMaterial,
  Vector3, Face3,
  DoubleSide, FaceColors
} from 'three';
import { MeshLine } from 'three.meshline';

/**
  drawUtil:
    Various utilities for drawing and THREE.js related stuff.
*/

/**
  makeLine:
    Given two points and a material, add the line to the scene.
*/
function makeLine(material, x1, y1, x2, y2) {
  const geometry = makeGeometry(x1, y1, x2, y2);
  return new Line(geometry, material);
}

/**
  makeSquare:
    Given a top-left and bottom-right corner, and a color, add the square to the scene.
*/
function makeSquare(x0, y0, x1, y1, c) {
  if (c == null) c = 0x00ff00;
  const geo = new Geometry();
  geo.vertices = [
    new Vector3(x0, y0, -0.0001),
    new Vector3(x1, y0, -0.0001),
    new Vector3(x1, y1, -0.0001),
    new Vector3(x0, y1, -0.0001),
    new Vector3(x0, y0, -0.0001),
  ];
  geo.faces = [
    new Face3(0, 1, 2),
    new Face3(0, 2, 3),
  ];

  const material = new MeshBasicMaterial({
    color: 0xff0000,
    side: DoubleSide,
    vertexColors: FaceColors
  });

  return new Mesh(geo, material);
}

/**
  makeMeshLine:
    Create a MeshLine with a geometry and material.

  @param {function} taperFn - Returns the line width at a given percentage along the line. This function is called on every point on the line.
        Takes a single argument (p), which is a number from [0, 1], representing the percentage the point is from first -> last.
*/
function makeMeshLine(geometry, material, taperFn) {
  const line = new MeshLine();
  line.setGeometry(geometry, taperFn || () => 1);
  return new Mesh(line.geometry, material);
}

/**
  makeGeometry:
    Returns a geometry of a single line between two points.
*/
function makeGeometry(x1, y1, x2, y2) {
  const geometry = new Geometry();
  geometry.vertices = [
    new Vector3(x1, y1),
    new Vector3(x2, y2),
  ];
  return geometry;
}

const makePoint = (x, y) => ({
  x,
  y
});

/**
  drawGrid:
    Given a bound (distance from origin), and a resolution, draw lines to create a grid.
*/
function drawGrid(bound, resolution, c) {
  const m = new LineBasicMaterial({
    color: c
  });
  for (let i = 0; i <= resolution; i++) {
    const j = Math.interpolate([0, resolution], [-bound, bound], i);
    makeLine(m, j, -bound, j, bound);
    makeLine(m, -bound, j, bound, j);
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
