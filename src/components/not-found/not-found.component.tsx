import cn from '@components/not-found/not-found.module.css';
import type { BaseProps } from '@utils/types';
import clsx from 'clsx';

export interface NotFoundProps extends BaseProps {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: {
    key: string;
    value: string;
  }[];
}

export const NotFound = (props: NotFoundProps) => (
  <section className={clsx(cn.NotFound, props.className)}>
    <h1 className={cn.Title}>{props.title}</h1>
    <h2 className={cn.Subtitle}>{props.subtitle}</h2>
    <h3 className={cn.TableTitle}>{props.tableTitle}</h3>
    <table className={cn.Table}>
      <tbody>
        {props.tableRows.map((row) => (
          <tr key={row.key} className={cn.TableRow}>
            <th className={cn.CellHead}>{row.key}</th>
            <td className={cn.CellData} dangerouslySetInnerHTML={{ __html: row.value }} />
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
