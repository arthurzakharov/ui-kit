import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@components/not-found/not-found.module.css';

type TableRow = {
  key: string;
  value: string;
};

export interface NotFoundProps extends Base {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: TableRow[];
}

/**
 * Displays a 404 not found page with title, subtitle, and contact information table.
 */
export const NotFound = ({ title, subtitle, tableTitle, tableRows, ...base }: NotFoundProps) => (
  <section
    data-testid={baseProps(base, 'data-testid', 'not-found')}
    className={clsx(cn.NotFound, baseProps(base, 'className'))}
  >
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
