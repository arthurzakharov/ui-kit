import { type MouseEvent, type PropsWithChildren, useRef } from 'react';
import { useHover, useToggle } from 'usehooks-ts';
import clsx from 'clsx';
import { ControlBox } from '@controls/control-box';
import { ControlRadioText } from '@controls/control-radio-text';
import { Svg, type SvgProps } from '@utils/svg';
import type { Base } from '@utils/types';
import cn from '@controls/control-button-card/control-button-card.module.css';

export interface ControlButtonCardProps extends PropsWithChildren<Base> {
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

export const ControlButtonCard = (props: ControlButtonCardProps) => {
  const {
    children,
    onClick,
    onFocus,
    onBlur,
    icon = null,
    iconPosition = 'top',
    active = false,
    disabled = false,
    preventDefault = false,
    blurAfterClick = false,
    className,
  } = props;
  const btnRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(btnRef);
  const [focused, toggleFocused] = useToggle(false);

  return (
    <ControlBox ref={btnRef} checked={active || isHover} state="idle" focused={focused} className={className}>
      <button
        type="button"
        disabled={disabled}
        className={clsx(cn.ControlButtonCard, {
          [cn.IconTop]: iconPosition === 'top',
          [cn.IconLeft]: iconPosition === 'left',
        })}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          if (preventDefault) e.preventDefault();
          if (blurAfterClick) e.currentTarget.blur();
          onClick?.call(null);
        }}
        onFocus={() => {
          toggleFocused();
          onFocus?.call(null);
        }}
        onBlur={() => {
          toggleFocused();
          onBlur?.call(null);
        }}
      >
        <Svg icon={icon} className={cn.Icon} />
        <ControlRadioText
          oneLine
          size="body"
          checked={active}
          color={disabled ? 'text-secondary' : 'text-primary'}
          className={cn.Text}
        >
          {children}
        </ControlRadioText>
      </button>
    </ControlBox>
  );
};
