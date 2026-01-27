import { type ReactElement, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useResizeObserver, useWindowSize } from 'usehooks-ts';
import { Control } from '@components/control/control.component';
import { Flex } from '@components/flex/flex.component';
import { Text, type TagProps } from '@components/text/text.component';
import cn from '@components/bottom-bar/bottom-bar.module.css';

type FallbackText = string | ReactElement;

interface BottomBarInfoItem<T> extends Pick<TagProps, 'lined' | 'weight' | 'size' | 'color'> {
  text: T;
}

interface BottomBarButton {
  text: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface BottomBarInfo {
  topLeft?: BottomBarInfoItem<string> | string;
  topRight?: BottomBarInfoItem<string> | string;
  bottomLeft?: BottomBarInfoItem<string> | string;
  bottomRight?: BottomBarInfoItem<string> | string;
}

export interface BottomBarProps {
  button: BottomBarButton;
  info: BottomBarInfo;
  message?: string;
  className?: string;
  staticFrom?: number;
}

const normalizeInfoItem = (
  item: BottomBarInfoItem<string> | string | undefined,
  defaults: Partial<BottomBarInfoItem<string>>,
): BottomBarInfoItem<FallbackText> => {
  if (!item) {
    return {
      text: <wbr />,
      lined: false,
      weight: defaults.weight || 'regular',
      size: defaults.size || 'regular',
      color: defaults.color || 'primary',
    };
  }
  if (typeof item === 'string') {
    return {
      text: item,
      lined: false,
      weight: defaults.weight || 'regular',
      size: defaults.size || 'regular',
      color: defaults.color || 'primary',
    };
  }
  return {
    text: item.text || <wbr />,
    lined: item.lined,
    weight: item.weight || defaults.weight || 'regular',
    size: item.size || defaults.size || 'regular',
    color: item.color || defaults.color || 'primary',
  };
};

export const BottomBar = (props: BottomBarProps) => {
  const { button, info, message = '', className = '', staticFrom = 768 } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { height } = useResizeObserver({
    ref,
    box: 'border-box',
  });

  const { width } = useWindowSize({ initializeWithValue: true, debounceDelay: 150 });

  useEffect(() => {
    if (height) {
      document.body.style.marginBottom = `${Math.round(height)}px`;
    } else {
      document.body.style.removeProperty('margin-bottom');
    }

    return () => {
      document.body.style.removeProperty('margin-bottom');
    };
  }, [height]);

  const items = useMemo(() => {
    return {
      topLeft: normalizeInfoItem(info.topLeft, { weight: 'medium', color: 'primary' }),
      topRight: normalizeInfoItem(info.topRight, { weight: 'medium', color: 'primary' }),
      bottomLeft: normalizeInfoItem(info.bottomLeft, { weight: 'regular', color: 'secondary' }),
      bottomRight: normalizeInfoItem(info.bottomRight, { weight: 'regular', color: 'secondary' }),
    };
  }, [info]);

  return (
    <div
      ref={ref}
      className={clsx(cn.BottomBar, className, width >= staticFrom ? cn.BottomBarStatic : cn.BottomBarFixed)}
    >
      <Flex direction="row" grow="equal">
        <Flex direction="column" align="start">
          <Text.Tag {...items.topLeft}>{items.topLeft.text}</Text.Tag>
          <Text.Tag {...items.bottomLeft}>{items.bottomLeft.text}</Text.Tag>
        </Flex>
        <Flex direction="column" align="end">
          <Text.Tag {...items.topRight}>{items.topRight.text}</Text.Tag>
          <Text.Tag {...items.bottomRight}>{items.bottomRight.text}</Text.Tag>
        </Flex>
      </Flex>
      {message && (
        <Flex justify="center" marginTop="sm" marginBottom="md">
          <Text.Tag color="secondary" size="regular" weight="regular">
            {message}
          </Text.Tag>
        </Flex>
      )}
      <Flex direction="row" marginTop="md">
        <Control.Button
          fullWidth
          color="primary"
          size="lg"
          loading={button.loading}
          disabled={button.disabled}
          onClick={button.onClick}
        >
          {button.text}
        </Control.Button>
      </Flex>
    </div>
  );
};
