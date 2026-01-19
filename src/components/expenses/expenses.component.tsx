import type { ReactNode } from 'react';
import cn from './expenses.module.css';

export interface ExpensesProps {
  title: () => ReactNode;
  content: () => ReactNode;
  subContent?: () => ReactNode;
  amountTitle: () => string;
  amountNumber: () => [number | string, string];
}

export const Expenses = (props: ExpensesProps) => {
  const { title, content, subContent, amountTitle, amountNumber } = props;

  return (
    <div className={cn.Expenses}>
      <h6 className={cn.ExpensesTitle}>{title()}</h6>
      <p className={cn.ExpensesContent}>{content()}</p>
      <div className={cn.ExpensesAmount}>
        <span>{amountTitle()}</span>
        <span>{amountNumber().join('')}</span>
      </div>
      {subContent ? <p className={cn.ExpensesSubContent}>{subContent()}</p> : null}
    </div>
  );
};
