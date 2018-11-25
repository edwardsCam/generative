import { slider, button } from 'utils/PropConfig'

const propConfig = [
  button('Draw', 'reset'),
  slider('randomness', 'Randomness', 0, 1, 0.05),
  slider('drawTime', 'Draw time', 0.00125, 0.1, 0.00125),
  slider('minBlankSpace', 'Minimum blank space', 0.05, 0.5, 0.0125),
  slider('minLineWidth', 'Thinnest line', 0.01, 0.1, 0.01),
  slider('maxLineWidth', 'Thickest line', 0.02, 0.2, 0.01),
]

export default propConfig
