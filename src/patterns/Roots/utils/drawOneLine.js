import { makeMeshLine } from 'utils/Draw'
import { resolution } from 'utils/Misc'
import { buildColorFromProps } from 'utils/Color'
import { interpolate } from 'utils/Math'

export default function drawOneLine(line, props) {
  const materialProps = {
    resolution: resolution(),
    lineWidth: line.initLineWidth,
    sizeAttenuation: 1,
    color: buildColorFromProps(props),
  }
  return makeMeshLine(
    line,
    materialProps,
    p => interpolate([0, 1], [props.maxLineWidth, props.minLineWidth], p),
  )
}
