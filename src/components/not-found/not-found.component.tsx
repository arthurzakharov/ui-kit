import clsx from 'clsx';
import type { BaseProps } from '@utils/types';
import cn from '@components/not-found/not-found.module.css';

type TableRow = {
  key: string;
  value: string;
};

export interface NotFoundProps extends BaseProps {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: TableRow[];
}

export const NotFound = ({ title, subtitle, tableTitle, tableRows, className = '' }: NotFoundProps) => (
  <section data-testid="not-found" className={clsx(cn.NotFound, className)}>
    <h1 data-testid="not-found-title" className={cn.Title}>
      {title}
    </h1>
    <h2 data-testid="not-found-subtitle" className={cn.Subtitle}>
      {subtitle}
    </h2>
    <h3 data-testid="not-found-table-title" className={cn.TableTitle}>
      {tableTitle}
    </h3>
    <table data-testid="not-found-table" className={cn.Table}>
      <tbody>
        {tableRows.map((row) => (
          <tr key={row.key} data-testid="not-found-row" className={cn.TableRow}>
            <th data-testid="not-found-cell-head" className={cn.CellHead}>
              {row.key}
            </th>
            <td
              data-testid="not-found-cell-data"
              className={cn.CellData}
              dangerouslySetInnerHTML={{ __html: row.value }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
