import { useState } from 'react';

import { HStack, Slider, Spacer, Text, VStack } from 'mossy-ui';

export default function SliderExample() {
  const [priceRange, setPriceRange] = useState(42);

  return (
    <VStack gap="x3">
      <HStack align="center" gap="x3">
        <Text textStyle="t3Regular" color="fg.neutralMuted">
          가격 범위
        </Text>
        <Spacer flexible />
        <Text textStyle="t3Bold" color="fg.brand">
          {`${priceRange}%`}
        </Text>
      </HStack>
      <Slider value={priceRange} min={0} max={100} step={1} onValueChange={setPriceRange} />
    </VStack>
  );
}
