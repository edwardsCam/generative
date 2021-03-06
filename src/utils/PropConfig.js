const slider = (prop, title, min, max, step = 1) => ({
  prop, title, min, max, step, type: 'slider',
})

const input = (prop, title) =>({
  prop, title, type: 'input',
})

const switcher = (prop, trueVal, falseVal) => ({
  prop, trueVal, falseVal, type: 'switcher',
})

const button = (title, callback) => ({
  title, callback, type: 'button',
})

const colorSliders = [
  slider('red', 'Red', 0, 255),
  slider('green', 'Green', 0, 255),
  slider('blue', 'Blue', 0, 255),
]

export {
  slider,
  input,
  switcher,
  colorSliders,
  button,
}
