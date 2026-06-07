import type { ChecklistRow, PropStatusItem } from './seed-parity';
import { componentRootName } from './seed-parity';

export interface PropTableItem extends PropStatusItem {
  prop: string;
  type: string;
}

// Type is shown only when Mossy has a meaningful matching surface.
const typeVisibleStatuses = new Set<PropStatusItem['status']>(['완료', '부분완료', 'Mossy only']);

const componentPropTypes: Record<string, Record<string, string>> = {
  Box: {
    as: 'React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined',
    asChild: 'boolean | undefined',
    background: 'MossyBoxBackground | undefined',
    bg: 'MossyBoxBackground | undefined',
    borderColor: 'MossyBoxBorderColor | undefined',
    borderRadius: 'MossyBoxRadiusToken | 0 | undefined',
    borderWidth: 'MossyBoxBorderWidth | undefined',
    boxShadow: 'MossyBoxShadow | undefined',
    children: 'ReactNode | undefined',
    flexGrow: '0 | 1 | (number & {}) | true | undefined',
    height: 'MossyBoxLength | undefined',
    p: 'MossyBoxPadding | undefined',
    padding: 'MossyBoxPadding | undefined',
    paddingBottom: 'MossyBoxPadding | undefined',
    paddingLeft: 'MossyBoxPadding | undefined',
    paddingRight: 'MossyBoxPadding | undefined',
    paddingTop: 'MossyBoxPadding | undefined',
    paddingX: 'MossyBoxPadding | undefined',
    paddingY: 'MossyBoxPadding | undefined',
    pb: 'MossyBoxPadding | undefined',
    pl: 'MossyBoxPadding | undefined',
    pr: 'MossyBoxPadding | undefined',
    pt: 'MossyBoxPadding | undefined',
    px: 'MossyBoxPadding | undefined',
    py: 'MossyBoxPadding | undefined',
    width: 'MossyBoxLength | undefined',
    zIndex: 'number | `${number}` | undefined',
  },
  Divider: {
    as: '"hr" | "div" | "li" | undefined',
    color: 'MossyBoxBorderColor | undefined',
    inset: 'boolean | undefined',
    orientation: '"horizontal" | "vertical" | undefined',
    thickness: 'MossyBoxBorderWidth | undefined',
  },
  Flex: {
    align: '"flex-start" | "flex-end" | "center" | "flexStart" | "flexEnd" | undefined',
    alignItems: '"flex-start" | "flex-end" | "center" | "flexStart" | "flexEnd" | undefined',
    direction: '"row" | "column" | "row-reverse" | "column-reverse" | "rowReverse" | "columnReverse" | undefined',
    display: '"flex" | "none" | undefined',
    flexGrow: '0 | 1 | (number & {}) | true | undefined',
    gap: '0 | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | undefined',
    grow: '0 | 1 | (number & {}) | true | undefined',
    justify:
      '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround" | undefined',
    justifyContent:
      '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround" | undefined',
    shrink: '0 | (number & {}) | true | undefined',
    wrap: '"wrap" | "wrap-reverse" | "nowrap" | true | undefined',
  },
  Float: {
    as: 'React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined',
    placement:
      '"bottom-end" | "bottom-start" | "top-end" | "top-start" | "bottom-center" | "top-center" | "middle-center" | "middle-end" | "middle-start"',
    offsetX: '0 | Dimension | undefined',
    offsetY: '0 | Dimension | undefined',
    zIndex: 'number | `${number}` | undefined',
  },
  Grid: {
    align: '"flex-start" | "flex-end" | "center" | "stretch" | "flexStart" | "flexEnd" | undefined',
    autoColumns: 'string | undefined',
    autoFlow: '"row" | "column" | "row dense" | "column dense" | undefined',
    autoRows: 'string | undefined',
    columns: 'number | undefined',
    display: '"grid" | "none" | undefined',
    gap: '0 | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | undefined',
    justify:
      '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround" | undefined',
    justifyItems: '"center" | "flex-start" | "flex-end" | "stretch" | undefined',
    rows: 'string | number | undefined',
  },
  HStack: {
    align: '"flex-start" | "flex-end" | "center" | "flexStart" | "flexEnd" | undefined',
    alignItems: '"flex-start" | "flex-end" | "center" | "flexStart" | "flexEnd" | undefined',
    children: 'ReactNode | undefined',
    direction: '"row" | "column" | "row-reverse" | "column-reverse" | "rowReverse" | "columnReverse" | undefined',
    display: '"flex" | "none" | undefined',
    flexGrow: '0 | 1 | (number & {}) | true | undefined',
    gap: '0 | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | undefined',
    grow: '0 | 1 | (number & {}) | true | undefined',
    justify:
      '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround" | undefined',
    justifyContent:
      '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround" | undefined',
    shrink: '0 | (number & {}) | true | undefined',
    wrap: '"wrap" | "wrap-reverse" | "nowrap" | true | undefined',
  },
  VStack: {
    align: '"flex-start" | "flex-end" | "center" | "flexStart" | "flexEnd" | undefined',
    alignItems: '"flex-start" | "flex-end" | "center" | "flexStart" | "flexEnd" | undefined',
    background: 'MossyBoxBackground | undefined',
    backgroundGradient: 'MossyBoxGradient | undefined',
    backgroundGradientDirection: 'MossyBoxGradientDirection | undefined',
    bg: 'MossyBoxBackground | undefined',
    bgGradient: 'MossyBoxGradient | undefined',
    bgGradientDirection: 'MossyBoxGradientDirection | undefined',
    borderBottomLeftRadius: 'MossyBoxRadiusToken | 0 | undefined',
    borderBottomRightRadius: 'MossyBoxRadiusToken | 0 | undefined',
    borderBottomWidth: 'MossyBoxBorderWidth | undefined',
    borderColor: 'MossyBoxBorderColor | undefined',
    borderLeftWidth: 'MossyBoxBorderWidth | undefined',
    borderRadius: 'MossyBoxRadiusToken | 0 | undefined',
    borderRightWidth: 'MossyBoxBorderWidth | undefined',
    borderTopLeftRadius: 'MossyBoxRadiusToken | 0 | undefined',
    borderTopRightRadius: 'MossyBoxRadiusToken | 0 | undefined',
    borderTopWidth: 'MossyBoxBorderWidth | undefined',
    borderWidth: 'MossyBoxBorderWidth | undefined',
    boxShadow: 'MossyBoxShadow | undefined',
    children: 'ReactNode | undefined',
    direction: '"row" | "column" | "row-reverse" | "column-reverse" | "rowReverse" | "columnReverse" | undefined',
    display: '"flex" | "none" | undefined',
    flexGrow: '0 | 1 | (number & {}) | true | undefined',
    gap: 'MossyBoxPadding | undefined',
    grow: '0 | 1 | (number & {}) | true | undefined',
    height: 'MossyBoxLength | undefined',
    justify:
      '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround" | undefined',
    justifyContent:
      '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround" | undefined',
    maxHeight: 'MossyVStackSizeConstraint | undefined',
    maxWidth: 'MossyVStackSizeConstraint | undefined',
    minHeight: 'MossyVStackSizeConstraint | undefined',
    minWidth: 'MossyVStackSizeConstraint | undefined',
    p: 'MossyBoxPadding | undefined',
    padding: 'MossyBoxPadding | undefined',
    paddingBottom: 'MossyBoxPadding | undefined',
    paddingLeft: 'MossyBoxPadding | undefined',
    paddingRight: 'MossyBoxPadding | undefined',
    paddingTop: 'MossyBoxPadding | undefined',
    paddingX: 'MossyBoxPadding | undefined',
    paddingY: 'MossyBoxPadding | undefined',
    pb: 'MossyBoxPadding | undefined',
    pl: 'MossyBoxPadding | undefined',
    pr: 'MossyBoxPadding | undefined',
    pt: 'MossyBoxPadding | undefined',
    px: 'MossyBoxPadding | undefined',
    py: 'MossyBoxPadding | undefined',
    shrink: '0 | (number & {}) | true | undefined',
    width: 'MossyBoxLength | undefined',
    wrap: '"wrap" | "wrap-reverse" | "nowrap" | true | undefined',
    zIndex: 'MossyBoxZIndex | undefined',
  },
  Text: {
    align: 'Extract<CSS.Property.TextAlign, "left" | "center" | "right"> | undefined',
    as: '"dt" | "dd" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong" | "legend" | undefined',
    color: 'ScopedColorFg | ScopedColorPalette | (string & {}) | undefined',
    fontSize: 'FontSize | (string & {}) | undefined',
    fontWeight: 'FontWeight | undefined',
    lineHeight: 'LineHeight | (string & {}) | undefined',
    maxLines: 'number | undefined',
    userSelect: 'Extract<CSS.Property.UserSelect, "none" | "text" | "auto"> | undefined',
    whiteSpace:
      'Extract<CSS.Property.WhiteSpace, "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | "break-spaces"> | undefined',
  },
};

const stylePropTypes: Record<string, string> = {
  _active: '{ bg?: ScopedColorBg | ScopedColorPalette | (string & {}); background?: ScopedColorBg | ScopedColorPalette | (string & {}); } | undefined',
  alignContent: '"flex-start" | "flex-end" | "center" | "stretch" | "flexStart" | "flexEnd" | undefined',
  alignItems: '"flex-start" | "flex-end" | "center" | "stretch" | "flexStart" | "flexEnd" | undefined',
  alignSelf: '"flex-start" | "flex-end" | "center" | "stretch" | "flexStart" | "flexEnd" | undefined',
  background: '(string & {}) | ScopedColorPalette | ScopedColorBg | ScopedColorBanner | undefined',
  backgroundGradient:
    '"fadeLayerFloating" | "fadeLayerDefault" | "glowMagic" | "glowMagicPressed" | "highlightMagic" | "highlightMagicPressed" | "shimmerMagic" | "shimmerNeutral" | undefined',
  backgroundGradientDirection:
    '(string & {}) | "to right" | "to left" | "to top" | "to bottom" | "to top right" | "to top left" | "to bottom right" | "to bottom left" | undefined',
  bg: '(string & {}) | ScopedColorPalette | ScopedColorBg | ScopedColorBanner | undefined',
  bgGradient:
    '"fadeLayerFloating" | "fadeLayerDefault" | "glowMagic" | "glowMagicPressed" | "highlightMagic" | "highlightMagicPressed" | "shimmerMagic" | "shimmerNeutral" | undefined',
  bgGradientDirection:
    '(string & {}) | "to right" | "to left" | "to top" | "to bottom" | "to top right" | "to top left" | "to bottom right" | "to bottom left" | undefined',
  bleedBottom: '"asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  bleedLeft: '"asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  bleedRight: '"asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  bleedTop: '"asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  bleedX: '"asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  bleedY: '"asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  borderBottomLeftRadius: 'Radius | 0 | (string & {}) | undefined',
  borderBottomRightRadius: 'Radius | 0 | (string & {}) | undefined',
  borderBottomWidth: '0 | 1 | (string & {}) | undefined',
  borderColor: 'ScopedColorStroke | ScopedColorPalette | (string & {}) | undefined',
  borderLeftWidth: '0 | 1 | (string & {}) | undefined',
  borderRadius: 'Radius | 0 | (string & {}) | undefined',
  borderRightWidth: '0 | 1 | (string & {}) | undefined',
  borderTopLeftRadius: 'Radius | 0 | (string & {}) | undefined',
  borderTopRightRadius: 'Radius | 0 | (string & {}) | undefined',
  borderTopWidth: '0 | 1 | (string & {}) | undefined',
  borderWidth: '0 | 1 | (string & {}) | undefined',
  bottom: '0 | (string & {}) | undefined',
  boxShadow: 'Shadow | (string & {}) | undefined',
  color: 'ScopedColorFg | ScopedColorPalette | (string & {}) | undefined',
  display:
    '"block" | "flex" | "inline-flex" | "inline" | "inline-block" | "none" | "inlineFlex" | "inlineBlock" | undefined',
  flexDirection:
    '"row" | "column" | "row-reverse" | "column-reverse" | "rowReverse" | "columnReverse" | undefined',
  flexGrow: '0 | 1 | (number & {}) | true | undefined',
  flexShrink: '0 | (number & {}) | true | undefined',
  flexWrap: '"wrap" | "wrap-reverse" | "nowrap" | true | undefined',
  gap: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  gridColumn: 'string | undefined',
  gridRow: 'string | undefined',
  height: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {}) | undefined',
  justifyContent:
    '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround" | undefined',
  justifySelf: '"center" | "start" | "end" | "stretch" | undefined',
  left: '0 | (string & {}) | undefined',
  maxHeight: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {}) | undefined',
  maxWidth: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {}) | undefined',
  minHeight: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {}) | undefined',
  minWidth: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {}) | undefined',
  p: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  padding: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  paddingBottom:
    'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | "safeArea" | (string & {}) | undefined',
  paddingLeft: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  paddingRight: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  paddingTop:
    'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | "safeArea" | (string & {}) | undefined',
  paddingX: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  paddingY: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  pb: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | "safeArea" | (string & {}) | undefined',
  pl: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  position: '"relative" | "absolute" | "fixed" | "sticky" | undefined',
  pr: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  pt: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | "safeArea" | (string & {}) | undefined',
  px: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  py: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {}) | undefined',
  overflowX: '"visible" | "hidden" | "scroll" | "auto" | undefined',
  overflowY: '"visible" | "hidden" | "scroll" | "auto" | undefined',
  right: '0 | (string & {}) | undefined',
  top: '0 | (string & {}) | undefined',
  unstable_transform: 'string | undefined',
  width: 'Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {}) | undefined',
  zIndex: 'number | (string & {}) | undefined',
};

const targetExpansions: Record<string, string[]> = {
  'StyleProps.bg/background': ['bg', 'background'],
  'StyleProps.bgGradient/backgroundGradient': ['bgGradient', 'backgroundGradient'],
  'StyleProps.bgGradientDirection/backgroundGradientDirection': ['bgGradientDirection', 'backgroundGradientDirection'],
  'StyleProps.borderColor/borderWidth': ['borderColor', 'borderWidth'],
  'StyleProps.directionalBorderWidth': ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  'StyleProps.borderRadius': ['borderRadius'],
  'StyleProps.cornerRadius*': [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
  ],
  'StyleProps.boxShadow': ['boxShadow'],
  'StyleProps.color': ['color'],
  'StyleProps._active': ['_active'],
  'StyleProps.display': ['display'],
  'StyleProps.flexGrow': ['flexGrow'],
  'StyleProps.flexShrink/flexDirection/flexWrap/justifyContent/justifySelf/alignItems/alignContent/alignSelf': [
    'flexShrink',
    'flexDirection',
    'flexWrap',
    'justifyContent',
    'justifySelf',
    'alignItems',
    'alignContent',
    'alignSelf',
  ],
  'StyleProps.flex*': [
    'flexGrow',
    'flexShrink',
    'flexDirection',
    'flexWrap',
    'justifyContent',
    'justifySelf',
    'alignItems',
    'alignContent',
    'alignSelf',
  ],
  'StyleProps.gap': ['gap'],
  'StyleProps.grid*': ['gridColumn', 'gridRow'],
  'StyleProps.inset': ['top', 'left', 'right', 'bottom'],
  'StyleProps.overflowX/overflowY': ['overflowX', 'overflowY'],
  'StyleProps.padding': ['padding', 'p'],
  'StyleProps.paddingX/paddingY': ['paddingX', 'px', 'paddingY', 'py'],
  'StyleProps.paddingLeft/paddingRight': ['paddingLeft', 'pl', 'paddingRight', 'pr'],
  'StyleProps.paddingTop/paddingBottom': ['paddingTop', 'pt', 'paddingBottom', 'pb'],
  'StyleProps.bleed*': ['bleedX', 'bleedY', 'bleedTop', 'bleedRight', 'bleedBottom', 'bleedLeft'],
  'StyleProps.position': ['position'],
  'StyleProps.unstable_transform': ['unstable_transform'],
  'StyleProps.width/height': ['width', 'height'],
  'StyleProps.min/max size': ['minWidth', 'maxWidth', 'minHeight', 'maxHeight'],
  'StyleProps.zIndex': ['zIndex'],
};

export function propTableItems(row: ChecklistRow, item: PropStatusItem): PropTableItem[] {
  const target = stripCode(item.target);
  const expansion = targetExpansions[target];

  if (expansion) {
    return expansion.map((propName) => ({
      ...item,
      prop: `${propName}?`,
      type: visiblePropType(item, propType(row, propName)),
    }));
  }

  const propName = normalizePropName(target);

  return [
    {
      ...item,
      prop: propName,
      type: visiblePropType(item, propType(row, propName)),
    },
  ];
}

function visiblePropType(item: PropStatusItem, type: string | undefined) {
  if (!typeVisibleStatuses.has(item.status)) return '-';
  return type ?? '-';
}

function propType(row: ChecklistRow, propName: string) {
  const normalized = propName.replace(/[?*]$/g, '');
  const root = componentRootName(row);

  return componentPropTypes[root]?.[normalized] ?? stylePropTypes[normalized] ?? '-';
}

function normalizePropName(value: string) {
  if (value.endsWith('Props') || value.endsWith(' attrs')) return value;
  return value;
}

function stripCode(value: string) {
  return value.replace(/^`|`$/g, '');
}
