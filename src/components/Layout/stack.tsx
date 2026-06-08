import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { Text } from '../Typography/Text';

import type {
  MossyLayoutBackground,
  MossyLayoutBackgroundProps,
  MossyLayoutBorderColor,
  MossyLayoutBorderProps,
  MossyLayoutBorderWidth,
  MossyLayoutLength,
  MossyLayoutPadding,
  MossyLayoutPaddingProps,
  MossyLayoutRadiusToken,
  MossyLayoutShadow,
  MossyLayoutZIndex,
  MossyLayoutCustomizationProps,
} from './surfaceProps.shared';

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

export interface MossyStackBaseProps extends MossyLayoutPaddingProps, MossyLayoutCustomizationProps {
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
  gap?: MossyLayoutPadding;
  bg?: MossyLayoutBackground;
  background?: MossyLayoutBackground;
  borderColor?: MossyLayoutBorderColor;
  borderWidth?: MossyLayoutBorderWidth;
  borderRadius?: MossyLayoutRadiusToken | 0;
  width?: MossyLayoutLength;
  height?: MossyLayoutLength;
}

/** width/height의 `'full'`을 제외한 Stack 크기 제약 토큰. */
export type MossyStackSizeConstraint = Exclude<MossyLayoutLength, 'full'>;

/** HStack·VStack이 공유하는 surface 장식 prop (gradient·방향별 테두리·모서리 반경·그림자·크기 제약·zIndex). */
export interface MossyStackSurfaceProps
  extends MossyLayoutBackgroundProps,
    MossyLayoutBorderProps,
    MossyLayoutCustomizationProps {
  boxShadow?: MossyLayoutShadow;
  minWidth?: MossyStackSizeConstraint;
  maxWidth?: MossyStackSizeConstraint;
  minHeight?: MossyStackSizeConstraint;
  maxHeight?: MossyStackSizeConstraint;
  zIndex?: MossyLayoutZIndex;
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

/**
 * flexbox `align-items` 기본값(`stretch`) 적용 여부. 명시적 cross-axis 정렬이 없을 때만
 * 자식을 cross axis로 늘린다 (Seed Flex가 `align`을 지정하지 않은 경우와 동일).
 */
export function shouldStretchCrossAxis(align: MossyStackAlign | undefined) {
  return align == null;
}

/**
 * flexbox `align-items: stretch` 기본값 재현 — cross axis 크기를 지정하지 않은 자식을
 * `width`/`height: 'full'`로 늘려 컨테이너의 cross axis를 채운다. 자식이 직접 cross axis
 * 크기를 지정했으면(flexbox에서 stretch보다 우선) 그대로 둔다. 요소가 아닌 자식은 건너뛴다.
 */
/**
 * width/height='full'을 소비할 수 있는 자식인지 판별한다. leaf `Text`는 레이아웃 사이즈 prop을
 * 소비하지 못하므로(주입 시 텍스트가 사라지는 등) 제외한다.
 */
function acceptsLayoutFill(child: ReactElement): boolean {
  return child.type !== Text;
}

export function stretchChildrenCrossAxis(children: ReactNode, crossAxis: 'width' | 'height'): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child) || !acceptsLayoutFill(child)) return child;
    const childProps = child.props as Record<string, unknown>;
    if (childProps[crossAxis] != null) return child;
    return cloneElement(child, { [crossAxis]: 'full' } as { width?: 'full'; height?: 'full' });
  });
}

/**
 * flexbox `flex-grow`처럼 grow 자식이 main axis를 채워 균등 분배되도록, grow 자식에 main axis
 * 크기를 `'full'`로 주입한다 (SwiftUI `layoutPriority`만으로는 균등 분배가 되지 않는 iOS 전용 보정).
 * Android는 `weight`로 이미 균등 분배되므로 호출하지 않는다.
 */
export function growChildrenMainAxis(children: ReactNode, mainAxis: 'width' | 'height'): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child) || !acceptsLayoutFill(child)) return child;
    const childProps = child.props as {
      grow?: MossyStackGrow;
      flexGrow?: MossyStackGrow;
      width?: unknown;
      height?: unknown;
    };
    const grow = normalizeGrow(resolveStackGrow(childProps));
    if (grow == null || grow <= 0 || childProps[mainAxis] != null) return child;
    return cloneElement(child, { [mainAxis]: 'full' } as { width?: 'full'; height?: 'full' });
  });
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
