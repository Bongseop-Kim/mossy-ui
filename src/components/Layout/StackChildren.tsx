import { Spacer } from '@expo/ui';
import { Children, isValidElement, type ReactNode } from 'react';

import { normalizeJustify, type MossyStackJustify } from './stack';

export function StackChildren({
  children,
  justify,
}: {
  children: ReactNode;
  justify?: MossyStackJustify;
}) {
  const normalized = normalizeJustify(justify);
  if (normalized == null || normalized === 'flex-start') return children;

  const childArray = Children.toArray(children);
  if (childArray.length === 0) return children;

  if (normalized === 'flex-end') {
    return [<Spacer key="mossy-justify-start" flexible />, ...childArray];
  }

  if (normalized === 'center') {
    return [
      <Spacer key="mossy-justify-start" flexible />,
      ...childArray,
      <Spacer key="mossy-justify-end" flexible />,
    ];
  }

  if (normalized === 'space-around') {
    return childArray.flatMap((child) => [
      <Spacer key={`mossy-justify-before-${childKey(child)}`} flexible />,
      child,
      <Spacer key={`mossy-justify-after-${childKey(child)}`} flexible />,
    ]);
  }

  return childArray.flatMap((child) =>
    child === childArray.at(-1)
      ? [child]
      : [child, <Spacer key={`mossy-justify-between-${childKey(child)}`} flexible />],
  );
}

function childKey(child: ReactNode) {
  if (isValidElement(child) && child.key != null) return String(child.key);
  if (typeof child === 'string' || typeof child === 'number') return String(child);
  return 'anonymous';
}
