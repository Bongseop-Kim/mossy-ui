import type { ComponentType } from 'react';

import BoxExample from './box';
import CheckboxExample from './checkbox';
import DividerExample from './divider';
import FlexExample from './flex';
import FloatExample from './float';
import GridExample from './grid';
import HStackExample from './hstack';
import LoadingIndicatorExample from './loading-indicator';
import ProgressCircleExample from './progress-circle';
import ScrollViewExample from './scroll-view';
import SegmentedControlExample from './segmented-control';
import SliderExample from './slider';
import SpacerExample from './spacer';
import SwitchExample from './switch';
import TextExample from './text';
import TextFieldExample from './text-field';
import VStackExample from './vstack';
import type { ComponentPreviewKey } from '../types';

export const componentExamples: Partial<Record<ComponentPreviewKey, ComponentType>> = {
  box: BoxExample,
  checkbox: CheckboxExample,
  divider: DividerExample,
  flex: FlexExample,
  float: FloatExample,
  grid: GridExample,
  hstack: HStackExample,
  'loading-indicator': LoadingIndicatorExample,
  'progress-circle': ProgressCircleExample,
  'scroll-view': ScrollViewExample,
  'segmented-control': SegmentedControlExample,
  slider: SliderExample,
  spacer: SpacerExample,
  switch: SwitchExample,
  text: TextExample,
  'text-field': TextFieldExample,
  vstack: VStackExample,
} satisfies Partial<Record<ComponentPreviewKey, ComponentType>>;
