import type { ReactNode } from 'react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@components/expenses/expenses.module.css';

export interface ExpensesProps extends Base {
  title: ReactNode;
  content: ReactNode;
  subContent?: ReactNode;
  amountTitle: string;
  amountNumber: [number | string, string];
}

/**
 * Displays expense information with title, content, amount, and optional sub-content.
 */
export const Expenses = ({ title, content, subContent, amountTitle, amountNumber, ...base }: ExpensesProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'expenses')}
    className={clsx(cn.Expenses, baseProps(base, 'className'))}
  >
    <h6 data-testid="expenses-title" className={cn.Title}>
      {title}
    </h6>
    <p data-testid="expenses-content" className={cn.Content}>
      {content}
    </p>
    <div data-testid="expenses-amount" className={cn.Amount}>
      <span>{amountTitle}</span>
      <span>{amountNumber.join('')}</span>
    </div>
    {subContent && (
      <p data-testid="expenses-sub-content" className={cn.SubContent}>
        {subContent}
      </p>
    )}
  </div>
);
