import { type MouseEvent, useRef } from 'react';
import { useHover, useToggle } from 'usehooks-ts';
import { Box } from '@controls/primitives/box';
import { Caption } from '@controls/primitives/caption';
import { Status } from '@controls/primitives/status';
import { baseProps } from '@utils/functions';
import type { Base, FontSize } from '@utils/types';
import cn from '@controls/buttons/button-radio/button-radio.module.css';

type ButtonRadioInfo = {
  text?: string;
  hintLeft?: string;
  hintRight?: string;
};

export interface ButtonRadioProps extends Base {
  text: string;
  textSize?: Extract<FontSize, 'body' | 'body-small'>;
  active?: boolean;
  disabled?: boolean;
  info?: ButtonRadioInfo;
  preventDefault?: boolean;
  blurAfterClick?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ButtonRadio = ({
  text,
  textSize = 'body',
  active = false,
  disabled = false,
  info,
  preventDefault = false,
  blurAfterClick = false,
  onClick,
  onFocus,
  onBlur,
  // Base props
  ...base
}: ButtonRadioProps) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(btnRef);
  const [focused, toggleFocused] = useToggle(false);

  return (
    <Box
      data-testid={baseProps(base, 'data-testid', 'button-radio')}
      ref={btnRef}
      checked={active || isHover}
      state="idle"
      focused={focused}
      className={baseProps(base, 'className')}
    >
      <button
        type="button"
        disabled={disabled}
        className={cn.ButtonRadio}
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
        <div className={cn.Wrap}>
          <Status state={active ? 'success' : 'idle'} />
          <div className={cn.Content}>
            <div className={cn.Row}>
              <Caption
                oneLine
                text={text}
                size={textSize}
                checked={active}
                color={disabled ? 'text-secondary' : 'text-primary'}
              />
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
    </Box>
  );
};
