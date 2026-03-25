import { useRef, type PropsWithChildren } from 'react';
import { useHover } from 'usehooks-ts';
import clsx from 'clsx';
import { FadeSlide } from '@animations/fade-slide';
import { Choice, type ChoiceProps } from '@controls/primitives/choice';
import { HiddenInput } from '@controls/primitives/hidden-input';
import { ErrorMessage } from '@controls/primitives/error-message';
import { useControlInteraction, type Interactive } from '@controls/utils';
import { Converter } from '@utils/converter';
import { baseProps } from '@utils/functions';
import type { Base, FontSize } from '@utils/types';
import cn from '@controls/interactives/checkbox/checkbox.module.css';

export interface CheckboxProps extends PropsWithChildren<Base>, Interactive<boolean> {
  iconSize?: ChoiceProps['size'];
  textSize?: Extract<FontSize, 'body' | 'body-small'>;
  message?: string;
}

export const Checkbox = ({
  // Interactive props
  id,
  value = false,
  disabled = false,
  state = 'idle',
  onChange,
  onFocus,
  onBlur,
  // Checkbox props
  iconSize = 'md',
  textSize = 'body-small',
  message = '',
  // PropsWithChildren
  children,
  // Base props
  ...base
}: CheckboxProps) => {
  const ref = useRef(null);
  const hovered = useHover(ref);
  const { focused, emitChange, handleFocus, handleBlur } = useControlInteraction<boolean>({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });

  return (
    <div data-testid={baseProps(base, 'data-testid', 'checkbox')} className={clsx(cn.Checkbox, baseProps(base, 'className'))}>
      <label
        data-testid="checkbox-label"
        ref={ref}
        htmlFor={id}
        className={cn.Label}
        onClick={(e) => {
          if (focused) return;
          e.preventDefault();
          emitChange(!value, 'mouse');
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <HiddenInput
          type="checkbox"
          id={id}
          name={id}
          value={Converter.Boolean.ToBooleanString(value)}
          checked={value}
          disabled={disabled}
          onChange={(e, source) => {
            e.stopPropagation();
            emitChange(!value, source);
          }}
        />
        <div className={cn.Choice}>
          <Choice
            type="checkbox"
            size={iconSize}
            state={state}
            checked={value}
            focused={focused}
            hovered={hovered}
            disabled={disabled}
          />
        </div>
        <div
          className={clsx(cn.Content, {
            [cn.Body]: textSize === 'body',
            [cn.BodySmall]: textSize === 'body-small',
          })}
        >
          {children}
        </div>
      </label>
      <FadeSlide name="text-message" condition={state === 'error' && !!message}>
        <ErrorMessage text={message} className={cn.ErrorMessage} />
      </FadeSlide>
    </div>
  );
};
