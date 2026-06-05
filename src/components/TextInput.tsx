import { TextInput as ExpoTextInput } from '@expo/ui';
import type { UniversalFontWeight, UniversalTextStyle } from '@expo/ui';
import type { ComponentProps } from 'react';

import {
  resolveMossyColor,
  resolveMossyDimension,
  toMossyTextStyleName,
  type MossyBackgroundColorToken,
  type MossyColorToken,
  type MossyDimensionToken,
  type MossyStrokeColorToken,
  type MossyTextStyleToken,
} from '../foundation/component-tokens';
import type { MossyTheme } from '../foundation/theme';
import { useMossyTheme } from '../theme';

type ExpoTextInputProps = ComponentProps<typeof ExpoTextInput>;
type MossyRadiusToken = keyof MossyTheme['radius'];

export type MossyTextInputProps = Omit<
  ExpoTextInputProps,
  'placeholderTextColor' | 'style' | 'textStyle'
> & {
  /**
   * 타이포그래피 토큰.
   * @default 't4Regular'
   */
  textStyle?: MossyTextStyleToken;
  /** 입력 텍스트 색상 — 토큰(`fg.*` · `palette.*`) 또는 원시 색상. */
  color?: MossyColorToken | (string & {});
  /**
   * placeholder 색상 — 토큰(`fg.*` · `palette.*`) 또는 원시 색상.
   * @default 'fg.neutralSubtle'
   */
  placeholderColor?: MossyColorToken | (string & {});
  /**
   * 배경 색상 — 토큰(`bg.*` · `palette.*`) 또는 원시 색상.
   * @default 'bg.layerDefault'
   */
  backgroundColor?: MossyBackgroundColorToken | (string & {});
  /**
   * 테두리 색상 — 토큰(`stroke.*` · `palette.*`) 또는 원시 색상.
   * @default 'stroke.neutralSubtle'
   */
  borderColor?: MossyStrokeColorToken | (string & {});
  /**
   * 높이 — dimension 토큰 또는 숫자(pt/dp).
   * @default 'x12'
   */
  height?: number | MossyDimensionToken;
  /**
   * 좌우 패딩 — dimension 토큰 또는 숫자(pt/dp).
   * @default 'x4'
   */
  paddingHorizontal?: number | MossyDimensionToken;
  /**
   * 모서리 반경 — radius 토큰 또는 숫자(pt/dp).
   * @default 'r3'
   */
  radius?: number | MossyRadiusToken;
  /** 박스 스타일 escape hatch. 토큰 기본값 뒤에 병합된다. */
  style?: ExpoTextInputProps['style'];
};

/** 토큰 기반 입력 필드. universal `TextInput`의 Mossy 래퍼. */
export function TextInput({
  textStyle = 't4Regular',
  color = 'fg.neutral',
  placeholderColor = 'fg.neutralSubtle',
  backgroundColor = 'bg.layerDefault',
  borderColor = 'stroke.neutralSubtle',
  height = 'x12',
  paddingHorizontal = 'x4',
  radius = 'r3',
  style,
  ...props
}: MossyTextInputProps) {
  const theme = useMossyTheme();
  const base = theme.typography[toMossyTextStyleName(textStyle)];
  const resolvedRadius = typeof radius === 'number' ? radius : theme.radius[radius];
  const resolvedTextStyle: UniversalTextStyle = {
    fontSize: base.fontSize,
    lineHeight: base.lineHeight,
    fontWeight: base.fontWeight as UniversalFontWeight,
    color: resolveColor(theme, color),
  };

  return (
    <ExpoTextInput
      placeholderTextColor={resolveColor(theme, placeholderColor)}
      textStyle={resolvedTextStyle}
      style={{
        height: resolveMossyDimension(theme, height),
        paddingHorizontal: resolveMossyDimension(theme, paddingHorizontal),
        backgroundColor: resolveColor(theme, backgroundColor),
        borderColor: resolveColor(theme, borderColor),
        borderRadius: resolvedRadius,
        borderWidth: 1,
        ...style,
      }}
      {...props}
    />
  );
}

function resolveColor(
  theme: MossyTheme,
  value: MossyBackgroundColorToken | MossyColorToken | MossyStrokeColorToken | (string & {}),
) {
  return resolveMossyColor(theme, value) ?? value;
}
