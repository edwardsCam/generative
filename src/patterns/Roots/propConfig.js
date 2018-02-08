import { slider, colorSliders } from 'utils/PropConfig';

const propConfig = [
  slider('resolution', 'Resolution', 20, 300, 10),
  slider('drawTime', 'Draw time', 0.001, 0.04, 0.001),
  slider('startX', 'Starting X', -3, 3, 0.25),
  slider('startY', 'Starting Y', -3, 3, 0.25),
  slider('startAngle', 'Starting Angle', 0, 355, 5),
  slider('minLineLength', 'Shortest line', 0.05, 1, 0.05),
  slider('maxLineLength', 'Longest line', 0.1, 1, 0.05),
  slider('minLineWidth', 'Thinnest line', 0.01, 0.5, 0.01),
  slider('maxLineWidth', 'Thickest line', 0.05, 0.5, 0.01),
  slider('minAngle', 'Min branching angle', 5, 90),
  slider('maxAngle', 'Max branching angle', 10, 175),
  slider('decayRate', 'Decay rate', 0, 0.2, 0.01),
  slider('minimumDecay', 'Min decay', 0, 0.5, 0.05),
  ...colorSliders,
];

export default propConfig;
