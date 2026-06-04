import type { TextStyle, ViewStyle } from 'react-native';

export type MossyThemeMode = 'light' | 'dark';
export type MossyTokenName = `$${string}`;
export type MossyTimingFunction = {
  css: string;
  bezier: readonly [number, number, number, number];
};
export type MossyGradientStop = {
  color: string;
  position: string;
};
export type MossyGradient = {
  css: string;
  stops: readonly MossyGradientStop[];
};
export type MossyShadow = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
> & {
  css: string;
};
export type MossyTextStyle = Pick<
  TextStyle,
  'fontSize' | 'lineHeight' | 'fontWeight'
>;
export type MossyTokenValue =
  | string
  | number
  | MossyTimingFunction
  | MossyGradient
  | MossyShadow
  | MossyTextStyle;
export type MossyTokenReference = Record<MossyTokenName, MossyTokenValue>;
export type MossyFontWeight = NonNullable<TextStyle['fontWeight']>;
export type MossyRawVariables = Record<string, string>;
export type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends readonly unknown[]
    ? T[Key]
    : T[Key] extends Record<string, unknown>
      ? DeepPartial<T[Key]>
      : T[Key];
};
