import { slider, boolean, colorSliders } from 'utils/PropConfig';

const propConfig = {
  maxPoints: slider('maxPoints', 'Num Points', 2, 2000, 1),
  rotateSpeed: slider('rotateSpeed', 'Rotate Speed', 0, 1, 0.01),
  drawTime: slider('drawTime', 'Draw Time', 0, 0.2, 0.02),
  growthTime: slider('growthTime', 'Growth Time', 0, 60, 5),
  pointDistance: slider('pointDistance', 'Point Distance', 0.1, 1, 0.00001),
  vertical: boolean('vertical', 'Is Vertical?'),
  likeWhoa: slider('likeWhoa', 'Like, Whoaaa', 0, 5, 0.0001),
  ...colorSliders,
};

export default propConfig;
