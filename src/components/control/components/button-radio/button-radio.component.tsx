import { type PropsWithChildren, type MouseEvent, useRef } from 'react';
import { useHover, useToggle } from 'usehooks-ts';
import { Control } from '../../../../main';
import cn from './button-radio.module.css';

export interface ButtonRadioInfo {
  text?: string;
  hintLeft?: string;
  hintRight?: string;
}

export interface ButtonRadioProps extends PropsWithChildren {
  active?: boolean;
  disabled?: boolean;
  preventDefault?: boolean;
  blurAfterCLick?: boolean;
  info?: ButtonRadioInfo;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ButtonRadio = (props: ButtonRadioProps) => {
  const {
    children,
    onClick,
    onFocus,
    onBlur,
    info,
    active = false,
    disabled = false,
    preventDefault = false,
    blurAfterCLick = false,
  } = props;
  const btnRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(btnRef);
  const [focused, toggleFocused] = useToggle(false);

  return (
    <Control.Box ref={btnRef} checked={active || isHover} state="idle" focused={focused}>
      <button
        type="button"
        disabled={disabled}
        className={cn.ButtonRadio}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          if (preventDefault) e.preventDefault();
          if (blurAfterCLick) e.currentTarget.blur();
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
        <div className={cn.ButtonRadioWrap}>
          <Control.Status state={active ? 'success' : 'idle'} />
          <div className={cn.ButtonRadioContent}>
            <div className={cn.ButtonRadioRow}>
              <Control.RadioText oneLine size="lg" checked={active} color={disabled ? 'secondary' : 'primary'}>
                {children}
              </Control.RadioText>
              {info?.text ? <span className={cn.ButtonRadioText}>{info.text}</span> : null}
            </div>
            {(info?.hintLeft || info?.hintRight) && (
              <div className={cn.ButtonRadioRow}>
                <span className={cn.ButtonRadioHint}>{info.hintLeft}</span>
                <span className={cn.ButtonRadioHint}>{info.hintRight}</span>
              </div>
            )}
          </div>
        </div>
      </button>
    </Control.Box>
  );
};
