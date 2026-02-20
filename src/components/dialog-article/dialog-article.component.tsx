import { type PropsWithChildren, useRef, useState } from 'react';
import { useResizeObserver, useWindowSize } from 'usehooks-ts';
import { ControlButton } from '@controls/control-button';
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
              <ControlButton blurAfterClick preventDefault color="tertiary" size="md" onClick={cancel.fn}>
                {cancel.text}
              </ControlButton>
            ) : null}
            {confirm ? (
              <ControlButton blurAfterClick preventDefault color="primary" size="md" onClick={confirm.fn}>
                {confirm.text}
              </ControlButton>
            ) : null}
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
};
