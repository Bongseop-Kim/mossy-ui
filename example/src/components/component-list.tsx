import { useRouter } from 'expo-router';

import { List, ListItem, Text, VStack } from 'mossy-ui';

import type { ShowcaseComponent } from '../types';

type ComponentListProps = {
  components: ShowcaseComponent[];
};

export function ComponentList({ components }: ComponentListProps) {
  return (
    <List>
      {components.length > 0 ? (
        components.map((component) => (
          <ComponentRow key={component.slug} component={component} />
        ))
      ) : (
        <ListItem>
          <Text textStyle="t4Regular" color="fg.neutralMuted">
            찾는 컴포넌트가 없어요.
          </Text>
        </ListItem>
      )}
    </List>
  );
}

type ComponentRowProps = {
  component: ShowcaseComponent;
};

function ComponentRow({ component }: ComponentRowProps) {
  const router = useRouter();

  return (
    <ListItem
      onPress={() => router.push(`/components/${component.slug}`)}
      trailing={
        <Text textStyle="t4Regular" color="fg.neutralSubtle">
          ›
        </Text>
      }
    >
      <VStack spacing={2}>
        <Text textStyle="t4Bold" color="fg.neutral">
          {component.name}
        </Text>
        <Text textStyle="t2Regular" color="fg.neutralMuted">
          {component.group}
        </Text>
      </VStack>
    </ListItem>
  );
}
