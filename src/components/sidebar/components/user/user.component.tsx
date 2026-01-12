import type { MouseEvent } from 'react';
import { Pencil } from 'lucide-react';
import cn from './user.module.css';

export interface UserProps {
  title?: string;
  button?: string;
  data?: string[];
  onClick: () => void;
}

export const User = (props: UserProps) => {
  const { title = 'Ihre Angaben', button = 'ändern', data = [], onClick } = props;

  const onButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.currentTarget.blur();
    onClick();
  };

  return (
    <div className={cn.User}>
      <div className={cn.UserHead}>
        <span className={cn.UserTitle} dangerouslySetInnerHTML={{ __html: title }} />
        <button type="button" className={cn.UserButton} onClick={onButtonClick}>
          <span className={cn.UserButtonText}>{button}</span>
          <Pencil className={cn.UserButtonIcon} />
        </button>
      </div>
      <ul className={cn.UserInfo}>
        {data.map((d, i) => (
          <li key={i} className={cn.UserInfoRaw}>
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
};
