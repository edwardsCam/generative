import { slider } from 'utils/PropConfig';

const propConfig = {
  minBlankSpace: slider('minBlankSpace', 'Minimum blank space', 0.05, 0.5, 0.0125),
  minLineWidth: slider('minLineWidth', 'Thinnest line', 0.01, 0.1, 0.01),
  maxLineWidth: slider('maxLineWidth', 'Thickest line', 0.02, 0.3, 0.02),
  drawTime: slider('drawTime', 'Draw time', 0.00125, 0.1, 0.00125),
  randomness: slider('randomness', 'Randomness', 0, 1, 0.05)
};

export default propConfig;
