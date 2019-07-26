import { slider, button, input } from 'utils/PropConfig'

const propConfig = [
  button('Draw', 'reset'),
  slider('randomness', 'Randomness', 0, 1, 0.05),
  slider('drawTime', 'Draw time', 0.001, 0.1, 0.001),
  slider('minBlankSpace', 'Minimum blank space', 0.03, 0.5, 0.01),
  input('colorBL', 'Color 1'),
  input('colorBR', 'Color 2'),
  input('colorTR', 'Color 3'),
  input('colorTL', 'Color 4'),
  button('Pause / Resume', 'pause'),
]

export default propConfig
