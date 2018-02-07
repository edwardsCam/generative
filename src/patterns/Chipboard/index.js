import createChipboard from './utils/createChipboard';
import { makeMeshLine } from 'utils/Draw';
import { resolution } from 'utils/Misc';
import { buildColorFromProps } from 'utils/Color';

export default function Chipboard(scene, initialProps) {

  let timeBuff = 0;
  let drawCursor = 0;
  let complete = false;
  const bound = 4;
  const lines = createChipboard(bound, {
    ...initialProps,
    lineWidthSub: (initialProps.maxLineWidth - initialProps.minLineWidth) * initialProps.minBlankSpace * 2,
  });

  return function animate(time, delta, props) {
    if (complete) return;

    timeBuff += delta;
    if (drawCursor < lines.length) {
      while (drawCursor < lines.length && timeBuff > props.drawTime) {
        timeBuff -= props.drawTime;
        const geom = lines[drawCursor++];
        const materialProps = {
          resolution: resolution(),
          lineWidth: geom.lineWidth,
          sizeAttenuation: 1,
          color: buildColorFromProps(props)
        };
        scene.add(
          makeMeshLine(geom, materialProps)
        );
      }
    } else {
      complete = true;
    }
  }
}
