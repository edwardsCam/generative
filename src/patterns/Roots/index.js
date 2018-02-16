import buildGrid from './utils/buildGrid';
import createGeoms from './utils/createGeoms';
import drawOneLine from './utils/drawOneLine';

export default function Roots(scene, initialProps) {

  let timeBuff = 0;
  let drawCursor = 0;
  let complete = false;
  const bound = 4;

  const grid = buildGrid(initialProps.resolution);
  const geoms = createGeoms(initialProps, bound, grid);

  function animate(time, delta, props) {
    if (complete) return;

    timeBuff += delta;
    if (drawCursor < geoms.length) {
      while (drawCursor < geoms.length && timeBuff > props.drawTime) {
        timeBuff -= props.drawTime;
        scene.add(
          drawOneLine(geoms[drawCursor++], props)
        );
      }
    } else {
      complete = true;
    }
  }

  return { animate };
}
