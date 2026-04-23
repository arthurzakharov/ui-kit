import clsx from 'clsx';
import { ArrowRight, Check } from 'lucide-react';
import { Content } from '@utils/content';
import type { Base } from '@utils/types';
import cn from '@components/payment/components/info/info.module.css';
import { baseProps } from '@utils/functions';

type InfoListType = 'check' | 'arrow';

type InfoListItem = {
  type: InfoListType;
  text: string;
};

export interface PaymentInfoProps extends Base {
  title: string;
  list: InfoListItem[];
}

export const Info = ({ title, list, ...base }: PaymentInfoProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'payment-info')}
    className={clsx(cn.Info, baseProps(base, 'className'))}
  >
    {title && <h6 className={cn.Title}>{title}</h6>}
    <ul className={cn.List}>
      {list.map((item, index) => (
        <li key={index} className={cn.Item}>
          <span
            className={clsx(cn.Circle, {
              [cn.CircleCheck]: item.type === 'check',
              [cn.CircleArrow]: item.type === 'arrow',
            })}
          >
            {item.type === 'check' && <Check className={cn.Icon} />}
            {item.type === 'arrow' && <ArrowRight className={cn.Icon} />}
          </span>
          <Content className={cn.Content}>{item.text}</Content>
        </li>
      ))}
    </ul>
  </div>
);
