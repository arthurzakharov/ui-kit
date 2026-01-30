import { Children, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import cn from '@components/form-row/form-row.module.css';

export const FormRow = (props: PropsWithChildren) => {
  const { children } = props;

  if (Children.count(children) === 0) return null;

  return (
    <div className={cn.FormRow}>
      <div
        className={clsx(
          cn.FormRowContent,
          Children.count(children) > 1 ? cn.FormRowContentMultiple : cn.FormRowContentSingle,
        )}
      >
        {children}
      </div>
    </div>
  );
};
