import type { ButtonProps } from './button.types';
import clsx from 'clsx';
import { containsHtml } from '../../utils';
import './button.css';

export const Button = (props: ButtonProps) => (
  <button
    type={props.type}
    disabled={props.disabled}
    className={clsx('control-button', {
      'control-button--sm': props.size === 'sm',
      'control-button--md': props.size === 'md',
      'control-button--lg': props.size === 'lg',
      'control-button--next': props.color === 'next',
      'control-button--previous': props.color === 'previous',
      'control-button--full': props.fullWidth,
    })}
    onClick={() => props.onClick?.call(null)}
    onFocus={() => props.onFocus?.call(null)}
    onBlur={() => props.onBlur?.call(null)}
  >
    <span className="control-button__text">{props.children}</span>
    {containsHtml(props.info) && props.info ? (
      <span className="control-button__info" dangerouslySetInnerHTML={{ __html: props.info }} />
    ) : (
      <span className="control-button__info">{props.info}</span>
    )}
  </button>
);
