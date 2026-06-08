import type { MossyTheme } from '../../foundation/theme';
import type { MossyGradient } from '../../foundation/types';
import type { MossyLayoutSurfaceGradientDirection } from './surface.shared';

/** 그림자 토큰이 해석된 값. iOS는 radius/offset/color, Android는 elevation 필드를 사용한다. */
export type MossyLayoutShadowValue = MossyTheme['shadow'][keyof MossyTheme['shadow']];

export interface MossyGradientPoint {
  x: number;
  y: number;
}

export interface MossyLinearGradientConfig {
  colors: string[];
  locations: number[];
  startPoint: MossyGradientPoint;
  endPoint: MossyGradientPoint;
}

export function createMossyLinearGradientConfig(
  gradient: MossyGradient,
  direction: MossyLayoutSurfaceGradientDirection,
): MossyLinearGradientConfig {
  const points = resolveGradientPoints(direction);

  return {
    colors: gradient.stops.map((stop) => stop.color),
    locations: gradient.stops.map((stop, index) => resolveStopLocation(stop.position, index, gradient.stops.length)),
    ...points,
  };
}

function resolveStopLocation(position: string, index: number, total: number) {
  if (position.endsWith('%')) {
    const percent = Number(position.slice(0, -1));
    if (!Number.isNaN(percent)) return percent / 100;
  }

  if (position === '0') return 0;
  if (position === '1') return 1;

  return total <= 1 ? 0 : index / (total - 1);
}

function resolveGradientPoints(direction: MossyLayoutSurfaceGradientDirection): {
  startPoint: MossyGradientPoint;
  endPoint: MossyGradientPoint;
} {
  switch (direction) {
    case 'to right':
      return { startPoint: { x: 0, y: 0.5 }, endPoint: { x: 1, y: 0.5 } };
    case 'to left':
      return { startPoint: { x: 1, y: 0.5 }, endPoint: { x: 0, y: 0.5 } };
    case 'to top':
      return { startPoint: { x: 0.5, y: 1 }, endPoint: { x: 0.5, y: 0 } };
    case 'to bottom':
      return { startPoint: { x: 0.5, y: 0 }, endPoint: { x: 0.5, y: 1 } };
    case 'to top right':
      return { startPoint: { x: 0, y: 1 }, endPoint: { x: 1, y: 0 } };
    case 'to top left':
      return { startPoint: { x: 1, y: 1 }, endPoint: { x: 0, y: 0 } };
    case 'to bottom right':
      return { startPoint: { x: 0, y: 0 }, endPoint: { x: 1, y: 1 } };
    case 'to bottom left':
      return { startPoint: { x: 1, y: 0 }, endPoint: { x: 0, y: 1 } };
    default:
      return resolveDegreeGradientPoints(direction);
  }
}

function resolveDegreeGradientPoints(direction: `${number}deg`) {
  const degrees = Number(direction.slice(0, -3));

  if (Number.isNaN(degrees)) {
    return { startPoint: { x: 0.5, y: 0 }, endPoint: { x: 0.5, y: 1 } };
  }

  const radians = (degrees * Math.PI) / 180;
  const x = Math.sin(radians);
  const y = -Math.cos(radians);

  return {
    startPoint: { x: 0.5 - x / 2, y: 0.5 - y / 2 },
    endPoint: { x: 0.5 + x / 2, y: 0.5 + y / 2 },
  };
}
