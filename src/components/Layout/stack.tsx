import { Spacer } from '@expo/ui';
import { Children, type ReactNode } from 'react';

import type { MossyLayoutSurfaceDimension, MossyLayoutSurfaceProps } from './surface.shared';

export type MossyStackDisplay = NonNullable<MossyLayoutSurfaceProps['display']>;

export type MossyStackAlign =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'flexStart'
  | 'flexEnd';

export type MossyStackJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'flexStart'
  | 'flexEnd'
  | 'spaceBetween'
  | 'spaceAround';

export type MossyStackGrow = 0 | 1 | (number & {}) | true;

export type MossyStackBaseProps = Pick<MossyLayoutSurfaceProps, 'display'> & {
  /** cross-axis 정렬. Seed `align` shorthand와 동일하다. */
  align?: MossyStackAlign;
  /** main-axis 배치. Seed `justify` shorthand와 동일하다. */
  justify?: MossyStackJustify;
  /** 부모 Stack 안에서 남는 공간을 차지하는 우선순위. */
  grow?: MossyStackGrow;
  /** 자식 사이 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp). */
  spacing?: MossyLayoutSurfaceDimension;
};

export type MossyStackAlignment = 'start' | 'center' | 'end';

export function normalizeGrow(grow: MossyStackGrow | undefined) {
  if (grow === true) return 1;
  return grow;
}

export function resolveAlignment(
  align: MossyStackAlign | undefined,
  alignment: MossyStackAlignment | undefined,
): MossyStackAlignment | undefined {
  if (align == null) return alignment;

  switch (align) {
    case 'center':
      return 'center';
    case 'flex-end':
    case 'flexEnd':
      return 'end';
    case 'flex-start':
    case 'flexStart':
      return 'start';
  }
}

export function normalizeJustify(justify: MossyStackJustify | undefined) {
  switch (justify) {
    case 'flexStart':
      return 'flex-start';
    case 'flexEnd':
      return 'flex-end';
    case 'spaceBetween':
      return 'space-between';
    case 'spaceAround':
      return 'space-around';
    default:
      return justify;
  }
}

export function renderJustifiedChildren(children: ReactNode, justify: MossyStackJustify | undefined) {
  const normalized = normalizeJustify(justify);
  if (normalized == null || normalized === 'flex-start') return children;

  const childArray = Children.toArray(children);
  if (childArray.length === 0) return children;

  if (normalized === 'flex-end') {
    return [<Spacer key="mossy-justify-start" flexible />, ...childArray];
  }

  if (normalized === 'center') {
    return [
      <Spacer key="mossy-justify-start" flexible />,
      ...childArray,
      <Spacer key="mossy-justify-end" flexible />,
    ];
  }

  if (normalized === 'space-around') {
    return childArray.flatMap((child, index) => [
      <Spacer key={`mossy-justify-before-${index}`} flexible />,
      child,
      <Spacer key={`mossy-justify-after-${index}`} flexible />,
    ]);
  }

  return childArray.flatMap((child, index) =>
    index === childArray.length - 1
      ? [child]
      : [child, <Spacer key={`mossy-justify-between-${index}`} flexible />],
  );
}

export function JustifiedStackChildren({
  children,
  justify,
}: {
  children: ReactNode;
  justify?: MossyStackJustify;
}) {
  return renderJustifiedChildren(children, justify);
}
