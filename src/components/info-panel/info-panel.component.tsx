import clsx from 'clsx';
import type { BaseProps } from '@utils/types';
import cn from '@components/info-panel/info-panel.module.css';

export interface InfoPanelProps extends BaseProps {
  data: [string, string][];
}

export const InfoPanel = ({ data, className = '' }: InfoPanelProps) => (
  <div data-testid="info-panel" className={clsx(cn.InfoPanel, className)}>
    <ul data-testid="info-panel-list" className={cn.List}>
      {data.map(([key, value]) => (
        <li key={key} className={cn.Item}>
          <span data-testid="info-panel-key" className={cn.Key}>
            {key}
          </span>
          <span data-testid="info-panel-value" className={cn.Value}>
            {value}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
