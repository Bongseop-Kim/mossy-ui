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
import {
  mossyDirectionalBorder,
  mossyLinearGradientBackground,
  mossySizeConstraints,
  mossyUnevenCornerRadius,
} from './surfaceModifiers.ios';
import { createMossyLinearGradientConfig } from './surfaceModifiers.shared';

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

    if (
      style.minWidth != null ||
      style.maxWidth != null ||
      style.minHeight != null ||
      style.maxHeight != null
    ) {
      modifiers.push(
        mossySizeConstraints({
          minWidth: style.minWidth,
          maxWidth: style.maxWidth,
          minHeight: style.minHeight,
          maxHeight: style.maxHeight,
        }),
      );
    }

    const gradient =
      style.backgroundGradient != null && style.backgroundGradientDirection != null
        ? createMossyLinearGradientConfig(style.backgroundGradient, style.backgroundGradientDirection)
        : undefined;
    const hasDirectionalBorder =
      style.borderColor != null &&
      (style.borderTopWidth != null ||
        style.borderRightWidth != null ||
        style.borderBottomWidth != null ||
        style.borderLeftWidth != null);
    const hasUnevenRadius =
      style.borderTopLeftRadius != null ||
      style.borderTopRightRadius != null ||
      style.borderBottomRightRadius != null ||
      style.borderBottomLeftRadius != null;

    if (gradient != null) {
      modifiers.push(mossyLinearGradientBackground(gradient));
    } else if (style.backgroundColor != null) {
      modifiers.push(background(String(style.backgroundColor)));
    }

    if (style.borderWidth != null && style.borderColor != null && !hasDirectionalBorder) {
      modifiers.push(border({ color: String(style.borderColor), width: style.borderWidth as number }));
    }
    if (hasUnevenRadius) {
      const radius = style.borderRadius as number | undefined;
      modifiers.push(
        mossyUnevenCornerRadius({
          topLeft: style.borderTopLeftRadius ?? radius,
          topRight: style.borderTopRightRadius ?? radius,
          bottomRight: style.borderBottomRightRadius ?? radius,
          bottomLeft: style.borderBottomLeftRadius ?? radius,
        }),
      );
    } else if (style.borderRadius != null) {
      modifiers.push(clipShape('roundedRectangle', style.borderRadius as number));
    }
    if (hasDirectionalBorder) {
      modifiers.push(
        mossyDirectionalBorder({
          color: String(style.borderColor),
          top: style.borderTopWidth ?? style.borderWidth,
          right: style.borderRightWidth ?? style.borderWidth,
          bottom: style.borderBottomWidth ?? style.borderWidth,
          left: style.borderLeftWidth ?? style.borderWidth,
        }),
      );
    }
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
