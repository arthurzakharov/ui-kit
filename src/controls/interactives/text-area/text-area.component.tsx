import clsx from 'clsx';
import { FadeSlide } from '@animations/fade-slide';
import { Box } from '@controls/primitives/box';
import { ErrorMessage } from '@controls/primitives/error-message';
import { useControlInteraction, type Interactive } from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/interactives/text-area/text-area.module.css';

export interface TextAreaProps extends Base, Interactive<string> {
  placeholder?: string;
  rows?: number;
  message?: string;
}

export const TextArea = ({
  // Interactive props
  id,
  value,
  disabled = false,
  state = 'idle',
  onChange,
  onFocus,
  onBlur,
  // TextArea props
  placeholder = '',
  rows = 5,
  message = '',
  // Base props
  ...base
}: TextAreaProps) => {
  const { focused, emitChange, handleFocus, handleBlur } = useControlInteraction<string>({
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
  });

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'textarea')}
      className={clsx(cn.Container, baseProps(base, 'className'))}
    >
      <Box state={state} focused={focused} className={baseProps(base, 'className')}>
        <textarea
          data-testid="textarea-input"
          disabled={disabled}
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          className={cn.Input}
          onChange={(e) => emitChange(e.target.value, 'keyboard')}
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
        />
      </Box>
      <FadeSlide name="text-message" condition={state === 'error' && !!message}>
        <ErrorMessage data-testid="textarea-error-message" text={message} className={cn.ErrorMessage} />
      </FadeSlide>
    </div>
  );
};
