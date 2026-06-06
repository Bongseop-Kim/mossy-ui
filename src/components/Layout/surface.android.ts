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

    const hasBorder = style.borderWidth != null && style.borderColor != null;
    const hasRadius = style.borderRadius != null;

    if (hasBorder && hasRadius) {
      const radius = style.borderRadius as number;
      const borderWidth = style.borderWidth as number;
      modifiers.push(clip(Shapes.RoundedCorner(radius)));
      modifiers.push(background(String(style.borderColor)));
      modifiers.push(paddingAll(borderWidth));
      modifiers.push(clip(Shapes.RoundedCorner(Math.max(0, radius - borderWidth))));
      if (style.backgroundColor != null) modifiers.push(background(String(style.backgroundColor)));
    } else {
      if (hasBorder) modifiers.push(border(style.borderWidth as number, String(style.borderColor)));
      if (hasRadius) modifiers.push(clip(Shapes.RoundedCorner(style.borderRadius as number)));
      if (style.backgroundColor != null) modifiers.push(background(String(style.backgroundColor)));
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
