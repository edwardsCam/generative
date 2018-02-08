import { slider, boolean, colorSliders } from 'utils/PropConfig';

const propConfig = [
  slider('likeWhoa', 'Like, Whoaaa', 0, 5, 0.0001),
  slider('pointDistance', 'Point Distance', 0.05, 1, 0.00001),
  slider('maxPoints', 'Num Points', 2, 2000, 1),
  slider('rotateSpeed', 'Rotate Speed', 0, 1, 0.01),
  slider('drawTime', 'Draw Time', 0, 0.2, 0.01),
  slider('growthTime', 'Growth Time', 0, 60, 1),
  boolean('vertical', 'Is Vertical?'),
  ...colorSliders,
];

export default propConfig;
