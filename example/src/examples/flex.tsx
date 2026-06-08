import { Flex, Text } from 'mossy-ui';

export default function FlexPreview() {
  return (
    <Flex direction="row" bg="bg.layerDefault" gap="x2" width="full" borderRadius="r2">
      <Flex
        direction="column"
        bg="bg.brandSolid"
        gap="x1_5"
        px="x2"
        py="x2"
        flexGrow={1}
        borderRadius="r2">
        <Flex bg="bg.neutralWeak" px="x4" py="x3" borderRadius="r1">
          <Text>1</Text>
        </Flex>
        <Flex bg="bg.neutralWeak" px="x4" py="x3" borderRadius="r1">
          <Text>2</Text>
        </Flex>
      </Flex>
      <Flex
        direction="row"
        bg="bg.brandSolid"
        gap="x1_5"
        px="x2"
        py="x2"
        flexGrow={1}
        borderRadius="r2">
        <Flex bg="bg.neutralWeak" px="x4" py="x3" borderRadius="r1">
          <Text>3</Text>
        </Flex>
        <Flex bg="bg.neutralWeak" px="x4" py="x3" borderRadius="r1">
          <Text>4</Text>
        </Flex>
      </Flex>
      <Flex bg="bg.brandSolid" px="x4" py="x3" borderRadius="r2">
        <Text>5</Text>
      </Flex>
    </Flex>
  );
}
