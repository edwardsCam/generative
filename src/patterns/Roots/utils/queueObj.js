import { randomInRange, coinToss } from 'utils/Math';

export default function queueObj(point, angle, p) {
  if (point == null) return null;
  const da = randomInRange(Math.PI * 0.25, Math.PI * 0.75);
  return {
    point,
    angle: coinToss() ? angle + da : angle - da,
    p
  };
}
