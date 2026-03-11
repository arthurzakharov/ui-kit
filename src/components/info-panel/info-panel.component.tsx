import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@components/info-panel/info-panel.module.css';

export interface InfoPanelProps extends Base {
  data: [string, string][];
}

/**
 * Displays a key-value list of informational rows.
 */
export const InfoPanel = ({ data, ...base }: InfoPanelProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'info-panel')}
    className={clsx(cn.InfoPanel, baseProps(base, 'className'))}
  >
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
