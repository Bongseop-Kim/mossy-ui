import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Float,
  Grid,
  HStack,
  LoadingIndicator,
  ProgressCircle,
  ScrollView,
  SegmentedControl,
  Slider,
  Spacer,
  Switch,
  Text,
  VStack,
} from 'mossy-ui';

import { segmentedOptions } from '../data';
import { styles } from '../styles';
import type { ComponentPreviewKey } from '../types';

type ComponentPreviewProps = {
  preview: ComponentPreviewKey;
  allowsNotice: boolean;
  isLocalOnly: boolean;
  priceRange: number;
  segmentIndex: number;
  onAllowsNoticeChange: (value: boolean) => void;
  onIsLocalOnlyChange: (value: boolean) => void;
  onPriceRangeChange: (value: number) => void;
  onSegmentIndexChange: (index: number) => void;
};

export function ComponentPreview({
  preview,
  allowsNotice,
  isLocalOnly,
  priceRange,
  segmentIndex,
  onAllowsNoticeChange,
  onIsLocalOnlyChange,
  onPriceRangeChange,
  onSegmentIndexChange,
}: ComponentPreviewProps) {
  switch (preview) {
    case 'box':
      return <BoxPreview />;
    case 'checkbox':
      return (
        <Checkbox
          label="가까운 동네만 보기"
          value={isLocalOnly}
          onValueChange={onIsLocalOnlyChange}
        />
      );
    case 'divider':
      return <DividerPreview />;
    case 'flex':
      return <FlexPreview />;
    case 'float':
      return <FloatPreview />;
    case 'grid':
      return <GridPreview />;
    case 'hstack':
      return <HStackPreview />;
    case 'loading-indicator':
      return <LoadingIndicator color="fg.brand" />;
    case 'progress-circle':
      return <ProgressCircle value={priceRange / 100} color="fg.brand" />;
    case 'scroll-view':
      return <ScrollViewPreview />;
    case 'segmented-control':
      return (
        <SegmentedControl
          options={segmentedOptions}
          selectedIndex={segmentIndex}
          onSelectedIndexChange={onSegmentIndexChange}
        />
      );
    case 'slider':
      return (
        <VStack spacing="x3">
          <HStack alignment="center" spacing="x3">
            <Text textStyle="t3Regular" color="fg.neutralMuted">
              가격 범위
            </Text>
            <Spacer flexible />
            <Text textStyle="t3Bold" color="fg.brand">
              {`${priceRange}%`}
            </Text>
          </HStack>
          <Slider
            value={priceRange}
            min={0}
            max={100}
            step={1}
            onValueChange={onPriceRangeChange}
          />
        </VStack>
      );
    case 'spacer':
      return <SpacerPreview />;
    case 'switch':
      return (
        <Switch
          label="새 소식 알림 받기"
          value={allowsNotice}
          onValueChange={onAllowsNoticeChange}
        />
      );
    case 'text':
      return <TextPreview />;
    case 'vstack':
      return (
        <VStack spacing="x2">
          <PreviewToken label="첫 번째" />
          <PreviewToken label="두 번째" />
          <PreviewToken label="세 번째" />
        </VStack>
      );
    default:
      return null;
  }
}

function BoxPreview() {
  return (
    <Box alignment="center" modifiers={[]}>
      <PreviewToken label="Box" />
    </Box>
  );
}

function DividerPreview() {
  return (
    <VStack spacing="x3">
      <Text textStyle="t4Bold" color="fg.neutral">
        위 영역
      </Text>
      <Divider />
      <Text textStyle="t4Regular" color="fg.neutralMuted">
        아래 영역
      </Text>
    </VStack>
  );
}

function FlexPreview() {
  return (
    <Flex direction="row" alignment="center" spacing="x2">
      <PreviewToken label="A" />
      <PreviewToken label="B" />
      <PreviewToken label="C" />
    </Flex>
  );
}

function FloatPreview() {
  return (
    <Float placement="center">
      <PreviewToken label="Float" />
    </Float>
  );
}

function GridPreview() {
  return (
    <Grid columns={2} horizontalSpacing="x2" verticalSpacing="x2">
      <PreviewToken label="1" />
      <PreviewToken label="2" />
      <PreviewToken label="3" />
      <PreviewToken label="4" />
    </Grid>
  );
}

function HStackPreview() {
  return (
    <HStack alignment="center" spacing="x2">
      <PreviewToken label="왼쪽" />
      <PreviewToken label="가운데" />
      <PreviewToken label="오른쪽" />
    </HStack>
  );
}

function ScrollViewPreview() {
  return (
    <ScrollView direction="horizontal" padding="x2">
      <HStack spacing="x4">
        <PreviewToken label="동네 소식" />
        <PreviewToken label="중고 거래" />
        <PreviewToken label="알바" />
        <PreviewToken label="부동산" />
        <PreviewToken label="중고차" />
        <PreviewToken label="모임" />
        <PreviewToken label="동네 지도" />
      </HStack>
    </ScrollView>
  );
}

function SpacerPreview() {
  return (
    <HStack alignment="center" spacing="x2">
      <PreviewToken label="왼쪽" />
      <Spacer flexible />
      <PreviewToken label="오른쪽" />
    </HStack>
  );
}

function TextPreview() {
  return (
    <VStack spacing="x2">
      <Text textStyle="screenTitle" color="fg.neutral">
        화면 제목
      </Text>
      <Text textStyle="t5Bold" color="fg.brand">
        강조 텍스트
      </Text>
      <Text textStyle="t4Regular" color="fg.neutralMuted">
        설명 문장은 짧고 이해하기 쉽게 씁니다.
      </Text>
    </VStack>
  );
}

type PreviewTokenProps = {
  label: string;
};

function PreviewToken({ label }: PreviewTokenProps) {
  return (
    <Text textStyle="t3Bold" color="fg.neutral" align="center">
      {label}
    </Text>
  );
}
