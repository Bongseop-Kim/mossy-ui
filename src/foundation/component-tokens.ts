import type {
  mossyDefaultLightValues,
  mossyDefaultScaleValues,
  MossyTextStyleName,
} from './default-token-values';
import type { MossyTheme } from './theme';

type KebabToCamel<Value extends string> = Value extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<KebabToCamel<Tail>>}`
  : Value;

type ScaleKey = keyof typeof mossyDefaultScaleValues;
type SemanticKey = keyof typeof mossyDefaultLightValues;

type ColorTokenOf<Group extends string> = SemanticKey extends infer Key
  ? Key extends `color-${Group}-${infer Name}`
    ? `${Group}.${KebabToCamel<Name>}`
    : never
  : never;

/** 색상 토큰 — `그룹.이름` 표기 (예: `'fg.neutral'`, `'palette.gray900'`). */
export type MossyColorToken = ColorTokenOf<'fg'> | ColorTokenOf<'palette'>;

/** 배경 색상 토큰 — `그룹.이름` 표기 (예: `'bg.layerDefault'`). */
export type MossyBackgroundColorToken = ColorTokenOf<'bg'> | ColorTokenOf<'palette'>;

/** 구분선·테두리 색상 토큰 — `그룹.이름` 표기 (예: `'stroke.neutralMuted'`). */
export type MossyStrokeColorToken = ColorTokenOf<'stroke'> | ColorTokenOf<'palette'>;

/** 간격·크기 토큰 — 공용 `$dimension` x 스케일 (예: `'x2'` = 8). */
export type MossyDimensionToken = ScaleKey extends infer Key
  ? Key extends `dimension-x${infer Name}`
    ? `x${Name}`
    : never
  : never;

/** 글꼴 크기·줄 간격 토큰 — t 스케일 (예: `'t5'`). RN에서는 모두 static 값으로 해석된다. */
export type MossyFontSizeToken = ScaleKey extends infer Key
  ? Key extends `font-size-t${infer Name}`
    ? Name extends `${string}-static`
      ? never
      : `t${Name}`
    : never
  : never;

/** 줄 간격 토큰 — 글꼴 크기와 같은 t 스케일을 공유한다. */
export type MossyLineHeightToken = MossyFontSizeToken;

/** 글꼴 굵기 토큰. */
export type MossyFontWeightToken = ScaleKey extends infer Key
  ? Key extends `font-weight-${infer Name}`
    ? KebabToCamel<Name>
    : never
  : never;

/** 타이포그래피 토큰 — 테마 `typography` 키에서 `textStyle` 접두사를 뗀 이름 (예: `'t5Regular'`). */
export type MossyTextStyleToken = MossyTextStyleName extends `textStyle${infer Name}`
  ? Uncapitalize<Name>
  : never;

/** `'t5Regular'` → `'textStyleT5Regular'` 테마 typography 키로 변환한다. */
export function toMossyTextStyleName(token: MossyTextStyleToken): MossyTextStyleName {
  return `textStyle${token.charAt(0).toUpperCase()}${token.slice(1)}` as MossyTextStyleName;
}

/** `그룹.이름` 색상 토큰을 현재 테마 색상 값으로 해석한다. 토큰 형태가 아니면 undefined. */
export function resolveMossyColor(theme: MossyTheme, token: string): string | undefined {
  const dotIndex = token.indexOf('.');
  if (dotIndex < 0) return undefined;

  const group = token.slice(0, dotIndex) as keyof MossyTheme['color'];
  const name = token.slice(dotIndex + 1);

  return theme.color[group]?.[name];
}

/** dimension 토큰(`'x2'`) 또는 숫자를 pt/dp 숫자로 해석한다. */
export function resolveMossyDimension(
  theme: MossyTheme,
  value: number | MossyDimensionToken | undefined,
): number | undefined {
  if (value == null || typeof value === 'number') return value;

  return theme.dimension.x[value.slice(1)];
}
