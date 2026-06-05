import type { TextInput } from '@expo/ui';
import type { ComponentProps, ReactNode } from 'react';

import type {
  MossyBackgroundColorToken,
  MossyColorToken,
  MossyDimensionToken,
  MossyStrokeColorToken,
  MossyTextStyleToken,
} from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';
import type { MossyTheme } from '../../foundation/theme';
import type { MossyIconProps } from '../Iconography/Icon';
import type { MossyHStackProps } from '../Layout/HStack';
import type { MossyTextProps } from '../Typography/Text';

type TextInputProps = ComponentProps<typeof TextInput>;
export type MossyTextFieldRadiusToken = keyof MossyTheme['radius'];

export interface MossyTextFieldRootProps {
  children?: ReactNode;
  value?: MossyTextFieldInputProps['value'];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  textStyle?: MossyTextStyleToken;
  color?: MossyColorToken | (string & {});
  placeholderColor?: MossyColorToken | (string & {});
  backgroundColor?: MossyBackgroundColorToken | (string & {});
  borderColor?: MossyStrokeColorToken | (string & {});
  height?: number | MossyDimensionToken;
  paddingHorizontal?: number | MossyDimensionToken;
  paddingVertical?: number | MossyDimensionToken;
  radius?: number | MossyTextFieldRadiusToken;
  borderWidth?: number | MossyDimensionToken;
  spacing?: number | MossyDimensionToken;
  alignment?: MossyHStackProps['alignment'];
  style?: MossyHStackProps['style'];
  testID?: string;
  modifiers?: MossyModifier[];
}

export type MossyTextFieldInputProps = Omit<
  TextInputProps,
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
  /** 입력 박스 스타일 escape hatch. 토큰 기본값 뒤에 병합된다. */
  style?: TextInputProps['style'];
};

export type MossyTextFieldTextareaProps = Omit<MossyTextFieldInputProps, 'multiline'> & {
  /**
   * true면 Expo UI multiline 입력의 자연 성장을 사용한다.
   * false면 `numberOfLines` 또는 `rows` 값으로 고정 줄 수를 예약한다.
   * @default true
   */
  autoresize?: boolean;
};

export type MossyTextFieldPrefixIconProps = MossyIconProps;
export type MossyTextFieldSuffixIconProps = MossyIconProps;
export type MossyTextFieldPrefixTextProps = MossyTextProps;
export type MossyTextFieldSuffixTextProps = MossyTextProps;

export interface MossyTextFieldContextValue {
  value?: MossyTextFieldInputProps['value'];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  textStyle: MossyTextStyleToken;
  color: MossyColorToken | (string & {});
  placeholderColor: MossyColorToken | (string & {});
}
