import type { UniversalBaseProps } from '@expo/ui';

/** 플랫폼 모디파이어 설정. `@expo/ui`의 `ModifierConfig`와 동일하다. */
export type MossyModifier = NonNullable<UniversalBaseProps['modifiers']>[number];
