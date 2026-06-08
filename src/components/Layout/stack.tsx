import { Children, type ReactNode } from 'react';

import type {
  MossyBoxBackground,
  MossyBoxBackgroundProps,
  MossyBoxBorderColor,
  MossyBoxBorderProps,
  MossyBoxBorderWidth,
  MossyBoxLength,
  MossyBoxPadding,
  MossyBoxPaddingProps,
  MossyBoxRadiusToken,
  MossyBoxShadow,
  MossyBoxZIndex,
  MossyLayoutCustomizationProps,
} from './Box/types';

export type MossyStackDisplay = 'flex' | 'none';

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

export type MossyStackDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | 'rowReverse'
  | 'columnReverse';

export interface MossyStackBaseProps extends MossyBoxPaddingProps, MossyLayoutCustomizationProps {
  /**
   * 렌더 여부. Seed Stack은 `flex`와 `none`만 제공한다.
   * @default 'flex'
   */
  display?: MossyStackDisplay;
  /** cross-axis 정렬. Seed `align` shorthand와 동일하다. */
  align?: MossyStackAlign;
  /** Seed Box `alignItems` prop. `align`과 같은 native alignment로 정규화한다. */
  alignItems?: MossyStackAlign;
  /** main-axis 배치. Seed `justify` shorthand와 동일하다. */
  justify?: MossyStackJustify;
  /** Seed Box `justifyContent` prop. `justify`와 같은 native Spacer 배치로 정규화한다. */
  justifyContent?: MossyStackJustify;
  /** 부모 Stack 안에서 남는 공간을 차지하는 우선순위. */
  grow?: MossyStackGrow;
  /** Seed Box `flexGrow` prop. `grow`와 같은 native grow modifier로 정규화한다. */
  flexGrow?: MossyStackGrow;
  /** 자식 사이 간격. Seed `gap` prop과 동일하다. */
  gap?: MossyBoxPadding;
  bg?: MossyBoxBackground;
  background?: MossyBoxBackground;
  borderColor?: MossyBoxBorderColor;
  borderWidth?: MossyBoxBorderWidth;
  borderRadius?: MossyBoxRadiusToken | 0;
  width?: MossyBoxLength;
  height?: MossyBoxLength;
}

/** width/height의 `'full'`을 제외한 Stack 크기 제약 토큰. */
export type MossyStackSizeConstraint = Exclude<MossyBoxLength, 'full'>;

/** HStack·VStack이 공유하는 surface 장식 prop (gradient·방향별 테두리·모서리 반경·그림자·크기 제약·zIndex). */
export interface MossyStackSurfaceProps
  extends MossyBoxBackgroundProps,
    MossyBoxBorderProps,
    MossyLayoutCustomizationProps {
  boxShadow?: MossyBoxShadow;
  minWidth?: MossyStackSizeConstraint;
  maxWidth?: MossyStackSizeConstraint;
  minHeight?: MossyStackSizeConstraint;
  maxHeight?: MossyStackSizeConstraint;
  zIndex?: MossyBoxZIndex;
}

export type MossyStackAlignment = 'start' | 'center' | 'end';

export function normalizeGrow(grow: MossyStackGrow | undefined) {
  if (grow === true) return 1;
  return grow;
}

/** grow shorthand 단일 해석. Seed Box `flexGrow`가 `grow`보다 우선한다 (HStack·VStack 공통). */
export function resolveStackGrow(props: { grow?: MossyStackGrow; flexGrow?: MossyStackGrow }) {
  return props.flexGrow ?? props.grow;
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

export function normalizeDirection(direction: MossyStackDirection) {
  if (direction === 'rowReverse') return 'row-reverse';
  if (direction === 'columnReverse') return 'column-reverse';
  return direction;
}

export function isColumnDirection(direction: MossyStackDirection) {
  const normalized = normalizeDirection(direction);
  return normalized === 'column' || normalized === 'column-reverse';
}

export function isReverseDirection(direction: MossyStackDirection) {
  const normalized = normalizeDirection(direction);
  return normalized === 'row-reverse' || normalized === 'column-reverse';
}

export function maybeReverseChildren(children: ReactNode, shouldReverse: boolean) {
  if (!shouldReverse) return children;
  return Children.toArray(children).reverse();
}

export function resolveDirectedJustify(
  justify: MossyStackJustify | undefined,
  isReverse: boolean,
) {
  const normalized = normalizeJustify(justify);

  if (!isReverse) return normalized;

  switch (normalized ?? 'flex-start') {
    case 'flex-start':
      return 'flex-end';
    case 'flex-end':
      return 'flex-start';
    default:
      return normalized;
  }
}
