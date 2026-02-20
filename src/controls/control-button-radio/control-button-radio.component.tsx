import { type PropsWithChildren, type MouseEvent, useRef } from 'react';
import { useHover, useToggle } from 'usehooks-ts';
import { ControlBox } from '@controls/control-box';
import { ControlRadioText } from '@controls/control-radio-text';
import { ControlStatus } from '@controls/control-status';
import cn from '@controls/control-button-radio/control-button-radio.module.css';

interface ControlButtonRadioInfo {
  text?: string;
  hintLeft?: string;
  hintRight?: string;
}

export interface ControlButtonRadioProps extends PropsWithChildren {
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
  } = props;
  const btnRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(btnRef);
  const [focused, toggleFocused] = useToggle(false);

  return (
    <ControlBox ref={btnRef} checked={active || isHover} state="idle" focused={focused}>
      <button
        type="button"
        disabled={disabled}
        className={cn.ButtonRadio}
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
        <div className={cn.ButtonRadioWrap}>
          <ControlStatus state={active ? 'success' : 'idle'} />
          <div className={cn.ButtonRadioContent}>
            <div className={cn.ButtonRadioRow}>
              <ControlRadioText oneLine size="lg" checked={active} color={disabled ? 'secondary' : 'primary'}>
                {children}
              </ControlRadioText>
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
    </ControlBox>
  );
};
