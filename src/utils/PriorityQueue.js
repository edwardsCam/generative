export default function PriorityQueue(priorityProp = '') {
  if (!(this instanceof PriorityQueue)) return new PriorityQueue(priorityProp)
  const dat = []

  this.push = function (item) {
    if (!item) return
    dat.push(item)
    bubbleUp()
  }
  this.pop = function () {
    if (!this.has()) return null
    const ret = dat.shift()
    bubbleDown()
    return ret
  }
  this.has = function () {
    return dat.length > 0
  }

  function bubbleUp() {
    let i = dat.length - 1
    while (i > 0) {
      const j = i >>> 1
      if (isHigherPriority(i, j)) {
        swap(i, j)
        i = j
      } else break
    }
  }

  function bubbleDown() {
    let i = 0
    const last = dat.length - 1
    while (true) {
      const left = (i << 1) + 1
      const right = left + 1
      let min = i
      if (left <= last && isHigherPriority(left, min)) {
        min = left
      }
      if (right <= last && isHigherPriority(right, min)) {
        min = right
      }
      if (i === min) {
        break
      } else {
        swap(i, min)
        i = min
      }
    }
  }

  function swap(i1, i2) {
    const tmp = dat[i1]
    dat[i1] = dat[i2]
    dat[i2] = tmp
  }

  /**
    Fitness function
  */
  const isHigherPriority = (i1, i2) => {
    const prop1 = dat[i1][priorityProp]
    const prop2 = dat[i2][priorityProp]
    if (prop1 != null && prop2 != null) {
      return prop1 > prop2
    }
    return false
  }
}
