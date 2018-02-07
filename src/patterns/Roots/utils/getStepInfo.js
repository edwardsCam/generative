import { distance, thetaFromTwoPoints } from 'utils/Math';
import getSquareSize from './getSquareSize';

/**
  A convenience package, info relevant for incrementally stepping from one point to another.
*/
export default function getStepInfo(p1, p2, bound, resolution) {
  const stepSize = getSquareSize(bound, resolution) / resolution;
  return {
    stepSize,
    theta: thetaFromTwoPoints(p1, p2),
    numSteps: Math.floor(distance(p1, p2) / stepSize)
  };
}
