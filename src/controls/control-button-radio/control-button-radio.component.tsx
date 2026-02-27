import { type MouseEvent, type PropsWithChildren, useRef } from 'react';
import { useHover, useToggle } from 'usehooks-ts';
import { ControlBox } from '@controls/control-box';
import { ControlRadioText } from '@controls/control-radio-text';
import { ControlStatus } from '@controls/control-status';
import type { Base } from '@utils/types';
import cn from '@controls/control-button-radio/control-button-radio.module.css';

type ControlButtonRadioInfo = {
  text?: string;
  hintLeft?: string;
  hintRight?: string;
};

export interface ControlButtonRadioProps extends PropsWithChildren<Base> {
  active?: boolean;
  disabled?: boolean;
  preventDefault?: boolean;
  blurAfterClick?: boolean;
  info?: ControlButtonRadioInfo;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ControlButtonRadio = (props: ControlButtonRadioProps) => {
  const {
    children,
    onClick,
    onFocus,
    onBlur,
    info,
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
        className={cn.ControlButtonRadio}
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
        <div className={cn.Wrap}>
          <ControlStatus state={active ? 'success' : 'idle'} />
          <div className={cn.Content}>
            <div className={cn.Row}>
              <ControlRadioText
                oneLine
                size="body"
                checked={active}
                color={disabled ? 'text-secondary' : 'text-primary'}
              >
                {children}
              </ControlRadioText>
              {info?.text ? <span className={cn.Text}>{info.text}</span> : null}
            </div>
            {(info?.hintLeft || info?.hintRight) && (
              <div className={cn.Row}>
                <span className={cn.Hint}>{info.hintLeft}</span>
                <span className={cn.Hint}>{info.hintRight}</span>
              </div>
            )}
          </div>
        </div>
      </button>
    </ControlBox>
  );
};
