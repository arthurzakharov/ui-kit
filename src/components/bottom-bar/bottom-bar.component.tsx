import { type ReactElement, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useResizeObserver, useWindowSize } from 'usehooks-ts';
import { ControlButton } from '@controls/control-button';
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
      size: defaults.size || 'body',
      color: defaults.color || 'text-primary',
    };
  }
  if (typeof item === 'string') {
    return {
      text: item,
      lined: false,
      weight: defaults.weight || 'regular',
      size: defaults.size || 'body',
      color: defaults.color || 'text-primary',
    };
  }
  return {
    text: item.text || <wbr />,
    lined: item.lined,
    weight: item.weight || defaults.weight || 'regular',
    size: item.size || defaults.size || 'body',
    color: item.color || defaults.color || 'text-primary',
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
      topLeft: normalizeInfoItem(info.topLeft, { weight: 'medium', color: 'text-primary' }),
      topRight: normalizeInfoItem(info.topRight, { weight: 'medium', color: 'text-primary' }),
      bottomLeft: normalizeInfoItem(info.bottomLeft, { weight: 'regular', color: 'text-secondary' }),
      bottomRight: normalizeInfoItem(info.bottomRight, { weight: 'regular', color: 'text-secondary' }),
    };
  }, [info]);

  return (
    <div
      ref={ref}
      className={clsx(cn.BottomBar, className, width >= staticFrom ? cn.BottomBarStatic : cn.BottomBarFixed)}
    >
      <Flex direction="row" grow="equal">
        <Flex direction="column" align="start">
          <Text {...items.topLeft}>{items.topLeft.text}</Text>
          <Text {...items.bottomLeft}>{items.bottomLeft.text}</Text>
        </Flex>
        <Flex direction="column" align="end">
          <Text {...items.topRight}>{items.topRight.text}</Text>
          <Text {...items.bottomRight}>{items.bottomRight.text}</Text>
        </Flex>
      </Flex>
      {message && (
        <Flex justify="center" mt="sm" mb="md">
          <Text color="text-secondary">{message}</Text>
        </Flex>
      )}
      <Flex direction="row" mt="md">
        <ControlButton
          fullWidth
          color="primary"
          size="lg"
          loading={button.loading}
          disabled={button.disabled}
          onClick={button.onClick}
        >
          {button.text}
        </ControlButton>
      </Flex>
    </div>
  );
};
