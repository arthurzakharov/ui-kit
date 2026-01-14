import cn from './not-found.module.css';

export interface NotFoundProps {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: {
    key: string;
    value: string;
  }[];
}

export const NotFound = (props: NotFoundProps) => {
  const { title = '', subtitle = '', tableTitle = '', tableRows = [] } = props;

  return (
    <section className={cn.NotFound}>
      <h1 className={cn.NotFoundH1}>{title}</h1>
      <h2 className={cn.NotFoundH2}>{subtitle}</h2>
      <h3 className={cn.NotFoundH3}>{tableTitle}</h3>
      <table className={cn.NotFoundTable}>
        <tbody>
          {tableRows.map(({ key, value }) => (
            <tr key={key}>
              <th className={cn.NotFoundTh}>{key}</th>
              <td className={cn.NotFoundTd} dangerouslySetInnerHTML={{ __html: value }} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
