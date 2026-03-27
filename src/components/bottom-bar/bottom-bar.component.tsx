import { type ReactElement, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useResizeObserver, useWindowSize } from 'usehooks-ts';
import { Text, type TextProps } from '@components/text/text.component';
import { Button } from '@controls/buttons';
import { baseProps } from '@utils/functions';
import type { Base, FontColor, FontSize, FontWeight } from '@utils/types';
import cn from '@components/bottom-bar/bottom-bar.module.css';

type FallbackText = string | ReactElement;

type BottomBarInfoItem<T> = {
  lined?: boolean;
  weight?: FontWeight;
  size?: FontSize;
  color?: FontColor;
  text: T;
};

type BottomBarButton = {
  text: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
};

type BottomBarInfo = {
  topLeft?: BottomBarInfoItem<string> | string;
  topRight?: BottomBarInfoItem<string> | string;
  bottomLeft?: BottomBarInfoItem<string> | string;
  bottomRight?: BottomBarInfoItem<string> | string;
};

type BottomBarMessage = {
  text: string;
  hidden?: boolean;
  color?: TextProps['color'];
  align?: TextProps['align'];
};

interface BottomBarProps extends Base {
  button: BottomBarButton;
  info: BottomBarInfo;
  message?: BottomBarMessage;
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

export const BottomBar = ({ button, info, message, staticFrom = 768, ...base }: BottomBarProps) => {
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

  const items = useMemo(
    () => ({
      topLeft: normalizeInfoItem(info.topLeft, { weight: 'medium', color: 'text-primary' }),
      topRight: normalizeInfoItem(info.topRight, { weight: 'medium', color: 'text-primary' }),
      bottomLeft: normalizeInfoItem(info.bottomLeft, { weight: 'regular', color: 'text-secondary' }),
      bottomRight: normalizeInfoItem(info.bottomRight, { weight: 'regular', color: 'text-secondary' }),
    }),
    [info],
  );

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'bottom-bar')}
      ref={ref}
      className={clsx(cn.BottomBar, baseProps(base, 'className'), width >= staticFrom ? cn.Static : cn.Fixed)}
    >
      <div className={cn.TopBlock}>
        <div className={cn.LeftBlock}>
          <Text {...items.topLeft}>{items.topLeft.text}</Text>
          <Text {...items.bottomLeft}>{items.bottomLeft.text}</Text>
        </div>
        <div className={cn.RightBlock}>
          <Text {...items.topRight}>{items.topRight.text}</Text>
          <Text {...items.bottomRight}>{items.bottomRight.text}</Text>
        </div>
      </div>
      {message && !message.hidden && (
        <Text color={message.color || 'text-secondary'} align={message.align || 'center'} className={cn.Message}>
          {message.text}
        </Text>
      )}
      <Button
        preventDefault
        blurAfterClick
        fullWidth
        text={button.text}
        color="primary"
        size="lg"
        loading={button.loading}
        disabled={button.disabled}
        className={cn.Button}
        onClick={button.onClick}
      />
    </div>
  );
};
