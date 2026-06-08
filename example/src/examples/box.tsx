import { Box, Text, VStack } from 'mossy-ui';

export default function BoxExample() {
  return (
    <VStack gap="x2">
      <Box
        bg="bg.neutralWeak"
        borderColor="stroke.brandWeak"
        borderWidth={2}
        borderRadius="r2"
        px="x3"
        py="x2"
        boxShadow="s2">
        <Text textStyle="t4Bold" color="fg.neutral">
          Box Example
        </Text>
      </Box>
      <Box
        bg="bg.neutralSolid"
        backgroundGradient="highlightMagic"
        backgroundGradientDirection="43deg"
        borderRadius="r2"
        px="x3"
        py="x2">
        <Text textStyle="t4Bold" color="palette.staticWhite">
          Box Gradient
        </Text>
      </Box>
      <Box
        bg="bg.neutralSolid"
        backgroundGradient="highlightMagic"
        backgroundGradientDirection="to bottom"
        borderRadius="r2"
        px="x3"
        py="x2">
        <Text textStyle="t4Bold" color="palette.staticWhite">
          Box Gradient
        </Text>
      </Box>
    </VStack>
  );
}
