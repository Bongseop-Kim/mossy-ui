import { Host } from '@expo/ui';

import {
  Divider,
  HStack,
  Spacer,
  Text,
  VStack,
  type MossyThemeMode,
  useMossyTheme,
} from 'mossy-ui';

import { styles, surfaceStyle } from '../styles';
import type { ShowcaseComponent } from '../types';
import { ComponentPreview } from './component-preview';
import { isStandalonePreview, StandalonePreview } from './standalone-preview';

type PreviewPanelProps = {
  mode: MossyThemeMode;
  component: ShowcaseComponent;
  allowsNotice: boolean;
  isLocalOnly: boolean;
  priceRange: number;
  segmentIndex: number;
  onAllowsNoticeChange: (value: boolean) => void;
  onIsLocalOnlyChange: (value: boolean) => void;
  onPriceRangeChange: (value: number) => void;
  onSegmentIndexChange: (index: number) => void;
};

export function PreviewPanel({
  mode,
  component,
  allowsNotice,
  isLocalOnly,
  priceRange,
  segmentIndex,
  onAllowsNoticeChange,
  onIsLocalOnlyChange,
  onPriceRangeChange,
  onSegmentIndexChange,
}: PreviewPanelProps) {
  const theme = useMossyTheme();
  const standalonePreview =
    component.preview != null && isStandalonePreview(component.preview)
      ? component.preview
      : null;

  return (
    <>
      <Host colorScheme={mode} matchContents={{ vertical: true }} style={styles.host}>
      <VStack spacing="x4" style={surfaceStyle(theme, 16)}>
        <HStack alignment="center" spacing="x3">
          <VStack spacing="x1">
            <Text textStyle="t5Bold" color="fg.neutral">
              {component.name}
            </Text>
            <Text textStyle="t2Regular" color="fg.neutralMuted">
              {component.group}
            </Text>
          </VStack>
          <Spacer flexible />
        </HStack>

        <Divider />

        {component.preview != null && standalonePreview == null ? (
          <ComponentPreview
            preview={component.preview}
            allowsNotice={allowsNotice}
            isLocalOnly={isLocalOnly}
            priceRange={priceRange}
            segmentIndex={segmentIndex}
            onAllowsNoticeChange={onAllowsNoticeChange}
            onIsLocalOnlyChange={onIsLocalOnlyChange}
            onPriceRangeChange={onPriceRangeChange}
            onSegmentIndexChange={onSegmentIndexChange}
          />
        ) : null}
      </VStack>
      </Host>
      {standalonePreview != null ? (
        <StandalonePreview preview={standalonePreview} mode={mode} />
      ) : null}
    </>
  );
}
