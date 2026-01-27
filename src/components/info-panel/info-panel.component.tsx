import { Text } from '@components/text/text.component';
import cn from '@components/info-panel/info-panel.module.css';

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
            <Text.Tag tag="span" weight="regular" size="small" color="secondary">
              {key}
            </Text.Tag>
            <Text.Tag tag="span" weight="regular" size="small" color="primary">
              {value}
            </Text.Tag>
          </li>
        ))}
      </ul>
    </div>
  );
};
