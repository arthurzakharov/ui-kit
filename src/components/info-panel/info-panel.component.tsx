import cn from './info-panel.module.css';

export interface InfoPanelProps {
  data: [string, string][];
}

export const InfoPanel = (props: InfoPanelProps) => {
  const { data = [] } = props;

  return (
    <div className={cn.InfoPanel}>
      <ul className={cn.InfoPanelList}>
        {data.map(([key, value]) => (
          <li key={key} className={cn.InfoPanelItem}>
            <span className={cn.InfoPanelKey}>{key}</span>
            <span className={cn.InfoPanelValue} dangerouslySetInnerHTML={{ __html: value }} />
          </li>
        ))}
      </ul>
    </div>
  );
};
