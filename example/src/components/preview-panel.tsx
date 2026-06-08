import { Host } from '@expo/ui';

import type { MossyThemeMode } from 'mossy-ui';

import { componentExamples } from '../examples';
import { styles } from '../styles';
import type { ComponentPreviewKey } from '../types';
import { isStandalonePreview, StandalonePreview } from './standalone-preview';

type PreviewPanelProps = {
  mode: MossyThemeMode;
  preview?: ComponentPreviewKey;
};

export function PreviewPanel({ mode, preview }: PreviewPanelProps) {
  const standalonePreview =
    preview != null && isStandalonePreview(preview) ? preview : null;
  const Example =
    preview != null && standalonePreview == null ? componentExamples[preview] : null;

  return (
    <>
      <Host colorScheme={mode} matchContents={{ vertical: true }} style={styles.host}>
        {Example != null ? <Example /> : null}
      </Host>
      {standalonePreview != null ? (
        <StandalonePreview preview={standalonePreview} mode={mode} />
      ) : null}
    </>
  );
}
