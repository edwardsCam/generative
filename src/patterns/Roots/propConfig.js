import { slider, colorSliders } from 'utils/PropConfig';

const propConfig = {
  startX: slider('startX', 'Starting X', -3, 3, 0.25),
  startY: slider('startY', 'Starting Y', -3, 3, 0.25),
  startAngle: slider('startAngle', 'Starting Angle', 0, 355, 5),
  minLineLength: slider('minLineLength', 'Shortest line', 0.05, 1, 0.05),
  maxLineLength: slider('maxLineLength', 'Longest line', 0.1, 1, 0.05),
  minLineWidth: slider('minLineWidth', 'Thinnest line', 0.01, 0.5, 0.01),
  maxLineWidth: slider('maxLineWidth', 'Thickest line', 0.05, 0.5, 0.01),
  minAngle: slider('minAngle', 'Min branching angle', 5, 90),
  maxAngle: slider('maxAngle', 'Max branching angle', 10, 175),
  decayRate: slider('decayRate', 'Decay rate', 0, 0.2, 0.01),
  minimumDecay: slider('minimumDecay', 'Min decay', 0, 0.5, 0.05),
  drawTime: slider('drawTime', 'Draw time', 0.001, 0.04, 0.001),
  resolution: slider('resolution', 'Resolution', 20, 300, 10),
  ...colorSliders,
};

export default propConfig;
