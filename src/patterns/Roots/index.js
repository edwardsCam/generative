import buildGrid from './utils/buildGrid';
import createGeoms from './utils/createGeoms';
import drawOneLine from './utils/drawOneLine';
import clearScene from 'utils/ClearScene';

export default function Roots(scene, initialProps) {

  let timeBuff, drawCursor, complete, bound, grid, geoms;
  reset();

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

  function reset() {
    clearScene(scene);
    timeBuff = 0;
    drawCursor = 0;
    complete = false;
    bound = 4;

    grid = buildGrid(initialProps.resolution);
    geoms = createGeoms(initialProps, bound, grid);
    return { reset: true };
  }

  return { animate, reset };
}
