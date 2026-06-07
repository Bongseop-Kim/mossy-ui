import type { ChecklistRow, PropStatusItem } from './seed-parity';
import { componentRootName } from './seed-parity';

export interface PropTableItem extends PropStatusItem {
  prop: string;
  type: string;
}

const componentPropTypes: Record<string, Record<string, string>> = {
  Box: {
    as: 'React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined',
    asChild: 'boolean | undefined',
  },
  Divider: {
    as: '"hr" | "div" | "li" | undefined',
    color: "BoxProps['borderColor'] | undefined",
    inset: 'boolean | undefined',
    orientation: '"horizontal" | "vertical" | undefined',
    thickness: "BoxProps['borderWidth'] | undefined",
  },
  Flex: {
    align: "BoxProps['alignItems'] | undefined",
    direction: "BoxProps['flexDirection'] | undefined",
    display: '"flex" | "none" | undefined',
    grow: "BoxProps['flexGrow'] | undefined",
    justify: "BoxProps['justifyContent'] | undefined",
    shrink: "BoxProps['flexShrink'] | undefined",
    wrap: "BoxProps['flexWrap'] | undefined",
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
  'StyleProps.borderColor/borderWidth': [
    'borderColor',
    'borderWidth',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
  ],
  'StyleProps.borderRadius*': [
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
  ],
  'StyleProps.boxShadow': ['boxShadow'],
  'StyleProps.color': ['color'],
  'StyleProps._active': ['_active'],
  'StyleProps.display': ['display'],
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
  'StyleProps.overflowX/overflowY': ['overflowX', 'overflowY'],
  'StyleProps.padding*': [
    'padding',
    'p',
    'paddingX',
    'px',
    'paddingY',
    'py',
    'paddingTop',
    'pt',
    'paddingRight',
    'pr',
    'paddingBottom',
    'pb',
    'paddingLeft',
    'pl',
    'bleedX',
    'bleedY',
    'bleedTop',
    'bleedRight',
    'bleedBottom',
    'bleedLeft',
  ],
  'StyleProps.position': ['position'],
  'StyleProps.unstable_transform': ['unstable_transform'],
  'StyleProps.width/height': ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight'],
  'StyleProps.zIndex': ['zIndex'],
};

export function propTableItems(row: ChecklistRow, item: PropStatusItem): PropTableItem[] {
  const target = stripCode(item.target);
  const expansion = targetExpansions[target];

  if (expansion) {
    return expansion.map((propName) => ({
      ...item,
      prop: `${propName}?`,
      type: stylePropTypes[propName] ?? '-',
    }));
  }

  const propName = normalizePropName(target);

  return [
    {
      ...item,
      prop: propName,
      type: propType(row, propName),
    },
  ];
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
