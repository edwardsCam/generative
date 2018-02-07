import { randomInRange, coinToss } from 'utils/Math';

export default function queueObj(point, origAngle, p) {
  if (point == null) return null;
  const da = randomInRange(Math.PI * 0.25, Math.PI * 0.75);
  const angle = coinToss() ? origAngle + da : origAngle - da;
  return { point, angle, p };
}
