import type { RadioTextProps } from './radio-text.types';
import clsx from 'clsx';
import './radio-text.css';

export const RadioText = ({ size, oneLine, checked, children }: RadioTextProps) => (
  <div
    className={clsx('control-radio-text', {
      'control-radio-text--size-md': size === 'md',
      'control-radio-text--size-lg': size === 'lg',
      'control-radio-text--one-line': oneLine,
    })}
  >
    <span
      data-text={children}
      className={clsx('control-radio-text__content', {
        'control-radio-text__content--checked': checked,
      })}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  </div>
);
