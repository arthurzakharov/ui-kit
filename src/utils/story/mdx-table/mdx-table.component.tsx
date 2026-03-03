import { Unstyled } from '@storybook/addon-docs/blocks';
import type { ReactNode } from 'react';
import cn from './mdx-table.module.css';

type MdxTableProps = {
  label: string[];
  items: string[][];
  render: (item: string[]) => ReactNode;
};

export const MdxTable = ({ label, items, render }: MdxTableProps) => {
  return (
    <Unstyled>
      <table className={cn.Table}>
        <thead>
          <tr>
            {label.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.join('|')}>
              {item.map((cell, index) => (
                <td key={`${cell}-${index}`}>
                  <span>{cell}</span>
                </td>
              ))}
              <td>{render(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Unstyled>
  );
};
