import { type MouseEvent, type PropsWithChildren, useRef } from 'react';
import { useHover, useToggle } from 'usehooks-ts';
import clsx from 'clsx';
import { ControlBox } from '@controls/control-box';
import { ControlRadioText } from '@controls/control-radio-text';
import { Svg, type SvgProps } from '@utils/svg';
import cn from '@controls/control-button-card/control-button-card.module.css';

export interface ControlButtonCardProps extends PropsWithChildren {
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
  } = props;
  const btnRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(btnRef);
  const [focused, toggleFocused] = useToggle(false);

  return (
    <ControlBox ref={btnRef} checked={active || isHover} state="idle" focused={focused}>
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
        <ControlRadioText
          oneLine
          size="lg"
          checked={active}
          color={disabled ? 'secondary' : 'primary'}
          className={cn.ButtonCardText}
        >
          {children}
        </ControlRadioText>
      </button>
    </ControlBox>
  );
};
