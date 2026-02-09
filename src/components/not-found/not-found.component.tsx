import clsx from 'clsx';
import type { NotFoundProps } from '@components/not-found/not-found.types';
import cn from '@components/not-found/not-found.module.css';

export const NotFound = (props: NotFoundProps) => (
  <section data-cy="not-found" className={clsx(cn.NotFound, props.className)}>
    <h1 data-cy="not-found-title" className={cn.Title}>
      {props.title}
    </h1>
    <h2 data-cy="not-found-subtitle" className={cn.Subtitle}>
      {props.subtitle}
    </h2>
    <h3 data-cy="not-found-table-title" className={cn.TableTitle}>
      {props.tableTitle}
    </h3>
    <table data-cy="not-found-table" className={cn.Table}>
      <tbody>
        {props.tableRows.map((row) => (
          <tr key={row.key} data-cy="not-found-row" className={cn.TableRow}>
            <th data-cy="not-found-cell-head" className={cn.CellHead}>
              {row.key}
            </th>
            <td data-cy="not-found-cell-data" className={cn.CellData} dangerouslySetInnerHTML={{ __html: row.value }} />
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
