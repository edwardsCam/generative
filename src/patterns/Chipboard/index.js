import clearScene from 'utils/ClearScene'
import chunkIntoPromises from 'utils/chunkIntoPromises'
import { BATCH_SIZE } from 'constants/batch'
import createChipboard from './utils/createChipboard'

export default function Chipboard(scene, initialProps) {
  let timeBuff
  let drawCursor
  let complete
  let bound
  let chipboard
  let isPaused = false
  reset()

  function animate(time, delta, props) {
    if (complete || isPaused) return Promise.reject()

    timeBuff += delta
    if (drawCursor >= chipboard.length) {
      complete = true
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      const { drawTime } = props
      const chunkToDraw = []
      while (drawCursor < chipboard.length && timeBuff > drawTime) {
        timeBuff -= drawTime
        chunkToDraw.push(drawCursor++)
      }
      Promise.all(chunkIntoPromises(
        chunkToDraw,
        BATCH_SIZE,
        i => scene.add(chipboard[i]),
      )).then(resolve)
    })
  }

  function reset() {
    isPaused = false
    return clearScene(scene).then(() => {
      timeBuff = 0
      drawCursor = 0
      complete = false
      bound = 4
      chipboard = createChipboard(bound, initialProps)
    })
  }

  function pause() {
    isPaused = !isPaused
  }

  return { animate, reset, pause }
}
