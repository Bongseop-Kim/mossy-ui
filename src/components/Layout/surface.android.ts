import {
  alpha,
  background,
  border,
  clickable,
  clip,
  height,
  padding,
  paddingAll,
  Shapes,
  size,
  testID as testIDModifier,
  width,
} from '@expo/ui/jetpack-compose/modifiers';

import type { MossyModifier } from '../../foundation/modifier';
import type { MossyTheme } from '../../foundation/theme';
import { EMPTY_MODIFIERS, resolveMossyLayoutSurfaceStyle, type MossyLayoutSurfaceProps } from './surface.shared';
import {
  mossyDirectionalBorder,
  mossyLinearGradientBackground,
  mossySizeConstraints,
  mossyUnevenCornerRadius,
} from './surfaceModifiers.android';
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
    if (style.width != null && style.height != null) {
      modifiers.push(size(style.width as number, style.height as number));
    } else if (style.width != null) {
      modifiers.push(width(style.width as number));
    } else if (style.height != null) {
      modifiers.push(height(style.height as number));
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

    const hasBorder = style.borderWidth != null && style.borderColor != null;
    const hasDirectionalBorder =
      style.borderColor != null &&
      (style.borderTopWidth != null ||
        style.borderRightWidth != null ||
        style.borderBottomWidth != null ||
        style.borderLeftWidth != null);
    const hasRadius = style.borderRadius != null;
    const hasUnevenRadius =
      style.borderTopLeftRadius != null ||
      style.borderTopRightRadius != null ||
      style.borderBottomRightRadius != null ||
      style.borderBottomLeftRadius != null;

    if (hasBorder && hasRadius && !hasDirectionalBorder && !hasUnevenRadius) {
      const radius = style.borderRadius as number;
      const borderWidth = style.borderWidth as number;
      modifiers.push(clip(Shapes.RoundedCorner(radius)));
      modifiers.push(background(String(style.borderColor)));
      modifiers.push(paddingAll(borderWidth));
      modifiers.push(clip(Shapes.RoundedCorner(Math.max(0, radius - borderWidth))));
      if (style.backgroundGradient != null && style.backgroundGradientDirection != null) {
        modifiers.push(
          mossyLinearGradientBackground(
            createMossyLinearGradientConfig(style.backgroundGradient, style.backgroundGradientDirection),
          ),
        );
      } else if (style.backgroundColor != null) {
        modifiers.push(background(String(style.backgroundColor)));
      }
    } else {
      if (hasBorder && !hasDirectionalBorder) modifiers.push(border(style.borderWidth as number, String(style.borderColor)));
      if (hasRadius && !hasUnevenRadius) modifiers.push(clip(Shapes.RoundedCorner(style.borderRadius as number)));
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
      }
      const gradient =
        style.backgroundGradient != null && style.backgroundGradientDirection != null
          ? createMossyLinearGradientConfig(style.backgroundGradient, style.backgroundGradientDirection)
          : undefined;

      if (gradient != null) {
        modifiers.push(mossyLinearGradientBackground(gradient));
      }
      if (gradient == null && style.backgroundColor != null) modifiers.push(background(String(style.backgroundColor)));
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
    }

    const all = (style.padding as number | undefined) ?? 0;
    const top = (style.paddingTop as number | undefined) ?? (style.paddingVertical as number | undefined) ?? all;
    const bottom =
      (style.paddingBottom as number | undefined) ?? (style.paddingVertical as number | undefined) ?? all;
    const start =
      (style.paddingLeft as number | undefined) ?? (style.paddingHorizontal as number | undefined) ?? all;
    const end =
      (style.paddingRight as number | undefined) ?? (style.paddingHorizontal as number | undefined) ?? all;

    if (top !== 0 || bottom !== 0 || start !== 0 || end !== 0) {
      if (top === bottom && bottom === start && start === end) {
        modifiers.push(paddingAll(top));
      } else {
        modifiers.push(padding(start, top, end, bottom));
      }
    }

    if (style.opacity != null) modifiers.push(alpha(style.opacity as number));
  }

  if (props.onPress != null && !props.disabled) modifiers.push(clickable(props.onPress));
  if (props.hidden) modifiers.push(alpha(0));
  if (props.testID != null) modifiers.push(testIDModifier(props.testID));

  modifiers.push(...(options?.afterSurface ?? EMPTY_MODIFIERS));
  modifiers.push(...(props.modifiers ?? EMPTY_MODIFIERS));

  return modifiers;
}
