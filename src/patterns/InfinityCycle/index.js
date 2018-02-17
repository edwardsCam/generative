import { interpolateSmooth } from 'utils/Math';
import {
  BufferGeometry, BufferAttribute,
  Line, LineBasicMaterial,
} from 'three';
import { buildColorFromProps } from 'utils/Color';
import clearScene from 'utils/ClearScene';

export default function InfinityCycle(scene, initialProps) {

  let numPoints, timeBuff, g, points, line;
  reset();

  function animate(time, delta, props) {
    const {
      maxPoints,
      vertical,
      growthTime,
      drawTime,
      pointDistance,
      likeWhoa,
      rotateSpeed,
    } = props;

    timeBuff += delta;
    numPoints = Math.min(numPoints, maxPoints);
    while (numPoints < maxPoints && timeBuff > drawTime) {
      timeBuff -= drawTime;
      numPoints++;
    }

    g.setDrawRange(0, numPoints);
    line.material.color = buildColorFromProps(props);
    line.material.needsUpdate = true;

    const isVert = vertical;
    const domain = [0, growthTime];
    const width = interpolateSmooth(
      { domain, range: isVert ? [4, 2] : [2, 5], value: time }
    );
    const height = interpolateSmooth(
      { domain, range: isVert ? [1, 4] : [4, 3], value: time }
    );
    for (let i = 0; i < numPoints; i++) {
      const j = time * rotateSpeed - (i * pointDistance);
      points[i * 3] = width * Math.sin((isVert ? likeWhoa : 1) * j);
      points[i * 3 + 1] = height * Math.sin((isVert ? 1 : likeWhoa) * j);
    }
    g.attributes.position.needsUpdate = true;
    return Promise.resolve();
  }

  function reset() {
    return clearScene(scene).then(() => {
      numPoints = 0;
      timeBuff = 0;
      g = new BufferGeometry();
      points = new Float32Array(15000); // max points of 5000, *3 for xyz
      g.addAttribute('position', new BufferAttribute(points, 3));

      line = new Line(g, new LineBasicMaterial({
        color: buildColorFromProps(initialProps)
      }));
      scene.add(line);
    });
  }

  return { animate, reset };
}
