import { makeMeshLine } from 'utils/Draw'
import { resolution } from 'utils/Misc'
import { buildColorFromProps } from 'utils/Color'
import clearScene from 'utils/ClearScene'
import chunkIntoPromises from 'utils/chunkIntoPromises'
import { BATCH_SIZE } from 'constants/batch'
import createChipboard from './utils/createChipboard'

export default function Chipboard(scene, initialProps) {
  let timeBuff; let drawCursor; let complete; let bound; let
    lines
  reset()

  function animate(time, delta, props) {
    if (complete) return Promise.reject()

    timeBuff += delta
    if (drawCursor >= lines.length) {
      complete = true
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      const { drawTime } = props
      const linesToDraw = []
      while (drawCursor < lines.length && timeBuff > drawTime) {
        timeBuff -= drawTime
        linesToDraw.push(drawCursor++)
      }
      Promise.all(chunkIntoPromises(
        linesToDraw,
        BATCH_SIZE,
        (i) => {
          const geom = lines[i]
          const materialProps = {
            resolution: resolution(),
            lineWidth: geom.lineWidth,
            sizeAttenuation: 1,
            color: buildColorFromProps(props),
          }
          scene.add(makeMeshLine(geom, materialProps))
        },
      )).then(() => resolve())
    })
  }

  function reset() {
    return clearScene(scene).then(() => {
      timeBuff = 0
      drawCursor = 0
      complete = false
      bound = 4
      lines = createChipboard(bound, {
        ...initialProps,
        lineWidthSub: (
          (initialProps.maxLineWidth - initialProps.minLineWidth) * initialProps.minBlankSpace * 2
        ),
      })
    })
  }

  return { animate, reset }
}
