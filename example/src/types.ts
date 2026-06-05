export type ComponentPreviewKey =
  | 'box'
  | 'checkbox'
  | 'divider'
  | 'flex'
  | 'float'
  | 'grid'
  | 'hstack'
  | 'list'
  | 'loading-indicator'
  | 'progress-circle'
  | 'scroll-fog'
  | 'scroll-view'
  | 'segmented-control'
  | 'slider'
  | 'spacer'
  | 'switch'
  | 'text'
  | 'vstack';

export type ShowcaseComponent = {
  name: string;
  slug: string;
  group: string;
  preview?: ComponentPreviewKey;
};
