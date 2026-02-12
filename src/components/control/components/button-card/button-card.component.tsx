import { type MouseEvent, type PropsWithChildren, useRef } from 'react';
import { useHover, useToggle } from 'usehooks-ts';
import clsx from 'clsx';
import { Control } from '@components/control/control.component';
import { Svg, type SvgProps } from '@utils/svg';
import cn from '@components//control/components/button-card/button-card.module.css';

export interface ButtonCardProps extends PropsWithChildren {
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
  } = props;
  const btnRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(btnRef);
  const [focused, toggleFocused] = useToggle(false);

  return (
    <Control.Box ref={btnRef} checked={active || isHover} state="idle" focused={focused}>
      <button
        type="button"
        disabled={disabled}
        className={clsx(cn.ButtonCard, {
          [cn.ButtonCardIconTop]: iconPosition === 'top',
          [cn.ButtonCardIconLeft]: iconPosition === 'left',
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
        <Svg icon={icon} className={cn.ButtonCardIcon} />
        <Control.RadioText
          oneLine
          size="lg"
          checked={active}
          color={disabled ? 'secondary' : 'primary'}
          className={cn.ButtonCardText}
        >
          {children}
        </Control.RadioText>
      </button>
    </Control.Box>
  );
};
