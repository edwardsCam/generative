import { slider, boolean } from 'utils/PropConfig';

const propConfig = {
  maxPoints: slider('maxPoints', 'Num Points', 5, 3000, 5),
  rotateSpeed: slider('rotateSpeed', 'Rotate Speed', 0.01, 1, 0.01),
  drawTime: slider('drawTime', 'Draw Time', 0, 0.2, 0.02),
  growthTime: slider('growthTime', 'Growth Time', 0, 60, 5),
  pointDistance: slider('pointDistance', 'Point Distance', 0.1, 1, 0.01),
  vertical: boolean('vertical', 'Is Vertical?'),
  likeWhoa: slider('likeWhoa', 'Like, Whoaaa', 0, 5, 0.0001),

  red: slider('red', 'Red', 0, 255, 1),
  green: slider('green', 'Green', 0, 255, 1),
  blue: slider('blue', 'Blue', 0, 255, 1),
};

export default propConfig;
