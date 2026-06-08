import type { ReactNode } from 'react';

import type {
  MossyLayoutBackgroundProps,
  MossyLayoutBorderProps,
  MossyLayoutCustomizationProps,
  MossyLayoutFlexGrow,
  MossyLayoutLength,
  MossyLayoutPaddingProps,
  MossyLayoutShadow,
  MossyLayoutZIndex,
} from '../surfaceProps.shared';

export interface MossyZStackProps
  extends MossyLayoutPaddingProps,
    MossyLayoutBackgroundProps,
    MossyLayoutBorderProps,
    MossyLayoutCustomizationProps {
  children?: ReactNode;
  boxShadow?: MossyLayoutShadow;
  width?: MossyLayoutLength;
  height?: MossyLayoutLength;
  minWidth?: MossyLayoutLength;
  maxWidth?: MossyLayoutLength;
  minHeight?: MossyLayoutLength;
  maxHeight?: MossyLayoutLength;
  flexGrow?: MossyLayoutFlexGrow;
  zIndex?: MossyLayoutZIndex;
}
