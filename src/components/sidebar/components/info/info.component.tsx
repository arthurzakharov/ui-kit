import cn from '@components/sidebar/components/info/info.module.css';

export interface InfoProps {
  data: [string, string][];
}

export const Info = (props: InfoProps) => {
  const { data = [] } = props;

  return (
    <ul className={cn.InfoPanel}>
      {data.map(([key, value]) => (
        <li key={key} className={cn.InfoPanelRow}>
          <span className={cn.InfoPanelKey}>{key}</span>
          <span className={cn.InfoPanelValue} dangerouslySetInnerHTML={{ __html: value }} />
        </li>
      ))}
    </ul>
  );
};
