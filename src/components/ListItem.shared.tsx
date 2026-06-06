import { ListItem as ExpoListItem } from '@expo/ui';
import { Children, isValidElement, type ComponentProps, type ReactNode } from 'react';

import { Text, type MossyTextProps } from './Typography/Text';

type ExpoListItemProps = ComponentProps<typeof ExpoListItem>;

export type MossyListItemProps = Pick<
  ExpoListItemProps,
  'children' | 'leading' | 'onPress' | 'supportingText' | 'testID' | 'trailing'
> & {
  /**
   * headline 텍스트 — `t5Regular`·`fg.neutral` 토큰 스타일로 렌더된다 (seed
   * `list-item` title 스펙). children의 비마커 노드와 함께 headline 영역에 표시된다.
   */
  title?: string;
  /**
   * title 아래 보조 텍스트 — `t3Regular`·`fg.neutralSubtle` 토큰 스타일로
   * supporting 슬롯에 주입된다 (seed `list-item` detail 스펙). `supportingText`
   * prop이나 `<ListItem.Supporting>` 마커가 있으면 그쪽이 우선한다.
   */
  detail?: string;
};

export type MossyListItemSlots = {
  headline: ReactNode[];
  leading?: ReactNode;
  supporting?: ReactNode;
  trailing?: ReactNode;
};

type ListItemTextTreatment = Pick<MossyTextProps, 'color' | 'textStyle'>;

const headlineTextTreatment = {
  textStyle: 't5Regular',
  color: 'fg.neutral',
} satisfies ListItemTextTreatment;

const supportingTextTreatment = {
  textStyle: 't3Regular',
  color: 'fg.neutralSubtle',
} satisfies ListItemTextTreatment;

const accessoryTextTreatment = {
  textStyle: 't4Regular',
  color: 'fg.neutralSubtle',
} satisfies ListItemTextTreatment;

function renderListItemTextNode(
  node: ReactNode,
  treatment: ListItemTextTreatment,
): ReactNode {
  return Children.map(node, (child) =>
    typeof child === 'string' || typeof child === 'number' ? (
      <Text textStyle={treatment.textStyle} color={treatment.color}>
        {String(child)}
      </Text>
    ) : (
      child
    ),
  );
}

export const listItemMarkers = {
  Leading: ExpoListItem.Leading,
  Supporting: ExpoListItem.Supporting,
  Trailing: ExpoListItem.Trailing,
};

export function extractMossyListItemSlots({
  children,
  detail,
  leading,
  supportingText,
  title,
  trailing,
}: MossyListItemProps): MossyListItemSlots {
  const slots: MossyListItemSlots = {
    headline:
      title == null
        ? []
        : [
            <Text key="title" {...headlineTextTreatment}>
              {title}
            </Text>,
          ],
    leading: renderListItemTextNode(leading, accessoryTextTreatment),
    supporting:
      renderListItemTextNode(supportingText, supportingTextTreatment) ??
      (detail == null ? undefined : (
        <Text {...supportingTextTreatment}>
          {detail}
        </Text>
      )),
    trailing: renderListItemTextNode(trailing, accessoryTextTreatment),
  };

  Children.forEach(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) {
      if (child != null && typeof child !== 'boolean') {
        slots.headline.push(renderListItemTextNode(child, headlineTextTreatment));
      }
      return;
    }

    if (child.type === listItemMarkers.Leading) {
      slots.leading = renderListItemTextNode(
        child.props.children,
        accessoryTextTreatment,
      );
      return;
    }

    if (child.type === listItemMarkers.Supporting) {
      slots.supporting = renderListItemTextNode(
        child.props.children,
        supportingTextTreatment,
      );
      return;
    }

    if (child.type === listItemMarkers.Trailing) {
      slots.trailing = renderListItemTextNode(
        child.props.children,
        accessoryTextTreatment,
      );
      return;
    }

    slots.headline.push(renderListItemTextNode(child, headlineTextTreatment));
  });

  return slots;
}
