import clearScene from 'utils/ClearScene'
import chunkIntoPromises from 'utils/chunkIntoPromises'
import { BATCH_SIZE } from 'constants/batch'
import buildGrid from './utils/buildGrid'
import createGeoms from './utils/createGeoms'
import drawOneLine from './utils/drawOneLine'

export default function Roots(scene, initialProps) {
  let timeBuff
  let drawCursor
  let complete
  let bound
  let grid
  let geoms
  reset()

  function animate(time, delta, props) {
    if (complete) return Promise.reject()

    timeBuff += delta
    if (drawCursor >= geoms.length) {
      complete = true
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      const { drawTime } = props
      const linesToDraw = []
      while (drawCursor < geoms.length && timeBuff > drawTime) {
        timeBuff -= drawTime
        linesToDraw.push(drawCursor++)
      }
      Promise.all(chunkIntoPromises(
        linesToDraw,
        BATCH_SIZE,
        i => scene.add(drawOneLine(geoms[i], props)),
      )).then(() => resolve())
    })
  }

  function reset() {
    return clearScene(scene).then(() => {
      timeBuff = 0
      drawCursor = 0
      complete = false
      bound = 4

      grid = buildGrid(initialProps.resolution)
      geoms = createGeoms(initialProps, bound, grid)
    })
  }

  return { animate, reset }
}
