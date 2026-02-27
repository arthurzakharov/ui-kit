import { Unstyled } from '@storybook/addon-docs/blocks';
import type { ReactNode } from 'react';
import cn from '@story/components/mdx-table/mdx-table.module.css';

type MdxTableProps = {
  label: string;
  items: string[];
  render: (item: string) => ReactNode;
};

export const MdxTable = ({ label, items, render }: MdxTableProps) => {
  return (
    <Unstyled>
      <table className={cn.Table}>
        <thead>
          <tr>
            <th>{label}</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item}>
              <td>
                <span>{item}</span>
              </td>
              <td>{render(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Unstyled>
  );
};
