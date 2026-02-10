import { Loader } from '@components/loader/loader.component';
import cn from '@components/loading-block/loading-block.module.css';

export const LoadingBlock = () => {
  return (
    <div className={cn.LoadingBlock}>
      <Loader size="lg" color="primary" />
    </div>
  );
};
