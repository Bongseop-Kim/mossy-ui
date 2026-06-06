import {
  background,
  border,
  clipShape,
  disabled as disabledModifier,
  frame,
  hidden as hiddenModifier,
  onAppear as onAppearModifier,
  onDisappear as onDisappearModifier,
  onTapGesture,
  opacity as opacityModifier,
  padding as paddingModifier,
} from '@expo/ui/swift-ui/modifiers';

import type { MossyModifier } from '../../foundation/modifier';
import type { MossyTheme } from '../../foundation/theme';
import { EMPTY_MODIFIERS, resolveMossyLayoutSurfaceStyle, type MossyLayoutSurfaceProps } from './surface.shared';

export function createMossyLayoutSurfaceModifiers(
  theme: MossyTheme,
  props: MossyLayoutSurfaceProps,
  options?: {
    beforeSurface?: MossyModifier[];
    afterSurface?: MossyModifier[];
  },
): MossyModifier[] {
  const style = resolveMossyLayoutSurfaceStyle(theme, props);
  const modifiers: MossyModifier[] = [...(options?.beforeSurface ?? EMPTY_MODIFIERS)];

  if (style) {
    const hasPadding =
      style.padding != null ||
      style.paddingHorizontal != null ||
      style.paddingVertical != null ||
      style.paddingTop != null ||
      style.paddingBottom != null ||
      style.paddingLeft != null ||
      style.paddingRight != null;

    if (hasPadding) {
      modifiers.push(
        paddingModifier({
          all: style.padding as number | undefined,
          horizontal: style.paddingHorizontal as number | undefined,
          vertical: style.paddingVertical as number | undefined,
          top: style.paddingTop as number | undefined,
          bottom: style.paddingBottom as number | undefined,
          leading: style.paddingLeft as number | undefined,
          trailing: style.paddingRight as number | undefined,
        }),
      );
    }

    if (style.width != null || style.height != null) {
      modifiers.push(
        frame({
          width: style.width as number | undefined,
          height: style.height as number | undefined,
        }),
      );
    }

    if (style.backgroundColor != null) modifiers.push(background(String(style.backgroundColor)));
    if (style.borderWidth != null && style.borderColor != null) {
      modifiers.push(border({ color: String(style.borderColor), width: style.borderWidth as number }));
    }
    if (style.borderRadius != null) modifiers.push(clipShape('roundedRectangle', style.borderRadius as number));
    if (style.opacity != null) modifiers.push(opacityModifier(style.opacity as number));
  }

  if (props.onPress != null && !props.disabled) modifiers.push(onTapGesture(props.onPress));
  if (props.onAppear != null) modifiers.push(onAppearModifier(props.onAppear));
  if (props.onDisappear != null) modifiers.push(onDisappearModifier(props.onDisappear));
  if (props.disabled) modifiers.push(disabledModifier(true));
  if (props.hidden) modifiers.push(hiddenModifier(true));

  modifiers.push(...(options?.afterSurface ?? EMPTY_MODIFIERS));
  modifiers.push(...(props.modifiers ?? EMPTY_MODIFIERS));

  return modifiers;
}
