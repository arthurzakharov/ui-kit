import { type PropsWithChildren, useRef, useState } from 'react';
import { useResizeObserver, useWindowSize } from 'usehooks-ts';
import { Control } from '@components/control/control.component';
import cn from '@components/dialog-article/dialog-article.module.css';

export interface DialogActionButton {
  text: string;
  fn: () => void;
}

export interface DialogArticleProps extends PropsWithChildren {
  cancel?: DialogActionButton;
  confirm?: DialogActionButton;
}

export const DialogArticle = (props: DialogArticleProps) => {
  const { children, cancel, confirm } = props;
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [paddingBottom, setPaddingBottom] = useState<number>(0);
  const { width } = useWindowSize();
  useResizeObserver({
    ref: buttonsRef,
    onResize: (size) => setPaddingBottom(width < 768 && size.height ? size.height : 0),
  });

  const withButtons = cancel || confirm;

  return (
    <div className={cn.DialogArticle} style={{ paddingBottom }}>
      {withButtons ? (
        <>
          {children}
          <div ref={buttonsRef} className={cn.DialogArticleButtons}>
            {cancel ? (
              <Control.Button blurAfterClick preventDefault color="tertiary" size="md" onClick={cancel.fn}>
                {cancel.text}
              </Control.Button>
            ) : null}
            {confirm ? (
              <Control.Button blurAfterClick preventDefault color="primary" size="md" onClick={confirm.fn}>
                {confirm.text}
              </Control.Button>
            ) : null}
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
};
