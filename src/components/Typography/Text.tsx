import { Text as ExpoText } from '@expo/ui';
import type { UniversalFontWeight, UniversalTextStyle } from '@expo/ui';
import type { ComponentProps } from 'react';

import {
  resolveMossyColor,
  toMossyTextStyleName,
  type MossyColorToken,
  type MossyFontSizeToken,
  type MossyFontWeightToken,
  type MossyLineHeightToken,
  type MossyTextStyleToken,
} from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';

export type MossyTextProps = Omit<ComponentProps<typeof ExpoText>, 'textStyle'> & {
  /**
   * 타이포그래피 토큰. 글꼴 크기·줄 간격·굵기를 한 번에 설정한다.
   * @default 't5Regular'
   */
  textStyle?: MossyTextStyleToken;
  /** 텍스트 색상 — 토큰(`fg.*` · `palette.*`) 또는 원시 색상 문자열. 생략하면 플랫폼 기본 색. */
  color?: MossyColorToken | (string & {});
  /**
   * 글꼴 크기 토큰. textStyle을 부분 오버라이드하고 대응되는 줄 간격 토큰을 함께 적용한다.
   * 주의: articleBody처럼 크기·줄 간격이 비대칭인 textStyle에서는 같은 크기를 명시해도
   * 줄 간격이 대응 토큰 값으로 바뀐다.
   */
  fontSize?: MossyFontSizeToken;
  /** 줄 간격 토큰. textStyle 또는 fontSize가 정한 줄 간격을 오버라이드한다. */
  lineHeight?: MossyLineHeightToken;
  /** 글꼴 굵기 토큰. textStyle을 부분 오버라이드한다. */
  fontWeight?: MossyFontWeightToken;
  /** 텍스트 가로 정렬. */
  align?: 'left' | 'right' | 'center';
  /** 글꼴 패밀리. */
  fontFamily?: string;
  /** 자간(pt). */
  letterSpacing?: number;
};

/** 토큰 기반 타이포그래피 컴포넌트. Mossy 텍스트 스타일을 해석해 universal `Text`로 렌더한다. */
export function Text({
  textStyle = 't5Regular',
  color,
  fontSize,
  lineHeight,
  fontWeight,
  align,
  fontFamily,
  letterSpacing,
  ...props
}: MossyTextProps) {
  const theme = useMossyTheme();
  const base = theme.typography[toMossyTextStyleName(textStyle)];

  const resolvedTextStyle: UniversalTextStyle = {
    fontSize: fontSize != null ? theme.fontSize[fontSize] : base.fontSize,
    lineHeight:
      lineHeight != null
        ? theme.lineHeight[lineHeight]
        : fontSize != null
          ? theme.lineHeight[fontSize]
          : base.lineHeight,
    fontWeight: (fontWeight != null
      ? theme.fontWeight[fontWeight]
      : base.fontWeight) as UniversalFontWeight,
    color: color != null ? (resolveMossyColor(theme, color) ?? color) : undefined,
    textAlign: align,
    fontFamily,
    letterSpacing,
  };

  return <ExpoText textStyle={resolvedTextStyle} {...props} />;
}
