import { Loader } from '../loader/loader.component';
import cn from './loading-block.module.css';

export const LoadingBlock = () => {
  return (
    <div className={cn.LoadingBlock}>
      <Loader color="primary" />
    </div>
  );
};
