import { Loader } from '@components/loader/loader.component';
import cn from '@components/loading-block/loading-block.module.css';

export const LoadingBlock = () => {
  return (
    <div className={cn.LoadingBlock}>
      <Loader color="primary" size={48} />
    </div>
  );
};
