import { Children, isValidElement, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base, Size } from '@utils/types';
import cn from '@components/form-row/form-row.module.css';

export interface FormRowProps extends PropsWithChildren<Base> {
  gap: Size;
}

export const FormRow = ({ children, gap = 'sm', ...base }: FormRowProps) => {
  if (Children.count(children) === 0) return null;

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'form-row')}
      className={clsx(cn.FormRow, baseProps(base, 'className'), {
        [cn.XXS]: gap === 'xxs',
        [cn.XS]: gap === 'xs',
        [cn.SM]: gap === 'sm',
        [cn.MD]: gap === 'md',
        [cn.LG]: gap === 'lg',
        [cn.XL]: gap === 'xl',
        [cn.XXL]: gap === 'xxl',
        [cn.XXXL]: gap === 'xxxl',
      })}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null;

        return (
          <div data-children-quantity={Children.count(children)} className={cn.Child}>
            {child}
          </div>
        );
      })}
    </div>
  );
};
