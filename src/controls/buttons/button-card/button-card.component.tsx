import { type MouseEvent, useRef } from 'react';
import { useHover, useToggle } from 'usehooks-ts';
import clsx from 'clsx';
import { Box, Caption } from '@controls/primitives';
import { baseProps } from '@utils/functions';
import { Svg, type SvgProps } from '@utils/svg';
import type { Base, FontSize } from '@utils/types';
import cn from '@controls/buttons/button-card/button-card.module.css';

export interface ButtonCardProps extends Base {
  text: string;
  textSize?: Extract<FontSize, 'body' | 'body-small'>;
  icon?: SvgProps['icon'];
  iconPosition?: 'top' | 'left';
  active?: boolean;
  disabled?: boolean;
  preventDefault?: boolean;
  blurAfterClick?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ButtonCard = (props: ButtonCardProps) => {
  const {
    text,
    textSize = 'body',
    icon = null,
    iconPosition = 'top',
    active = false,
    disabled = false,
    preventDefault = false,
    blurAfterClick = false,
    onClick,
    onFocus,
    onBlur,
    // Base props
    ...base
  } = props;
  const btnRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(btnRef);
  const [focused, toggleFocused] = useToggle(false);

  return (
    <Box
      data-testid={baseProps(base, 'data-testid', 'button-card')}
      ref={btnRef}
      checked={active || isHover}
      state="idle"
      focused={focused}
      className={baseProps(base, 'className')}
    >
      <button
        type="button"
        disabled={disabled}
        className={clsx(cn.ButtonCard, {
          [cn.IconTop]: iconPosition === 'top',
          [cn.IconLeft]: iconPosition === 'left',
        })}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          if (preventDefault) e.preventDefault();
          if (blurAfterClick) e.currentTarget.blur();
          onClick?.();
        }}
        onFocus={() => {
          toggleFocused();
          onFocus?.();
        }}
        onBlur={() => {
          toggleFocused();
          onBlur?.();
        }}
      >
        <Svg icon={icon} className={cn.Icon} />
        <Caption
          oneLine
          text={text}
          size={textSize}
          checked={active}
          color={disabled ? 'text-secondary' : 'text-primary'}
          className={cn.Text}
        />
      </button>
    </Box>
  );
};
