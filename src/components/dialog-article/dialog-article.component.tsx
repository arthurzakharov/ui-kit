import { type PropsWithChildren, useRef, useState } from 'react';
import { useResizeObserver, useWindowSize } from 'usehooks-ts';
import clsx from 'clsx';
import { Button } from '@controls/button';
import { baseProps } from '@utils/functions';
import { type Base } from '@utils/types';
import cn from '@components/dialog-article/dialog-article.module.css';

interface DialogActionButton {
  text: string;
  fn: () => void;
}

interface DialogArticleProps extends PropsWithChildren<Base> {
  cancel?: DialogActionButton;
  confirm?: DialogActionButton;
}

export const DialogArticle = (props: DialogArticleProps) => {
  const { children, cancel, confirm, ...base } = props;
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [paddingBottom, setPaddingBottom] = useState<number>(0);
  const { width } = useWindowSize();

  useResizeObserver({
    ref: buttonsRef,
    onResize: (size) => setPaddingBottom(width < 768 && size.height ? size.height : 0),
  });

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'dialog-article')}
      className={clsx(cn.DialogArticle, baseProps(base, 'className'))}
      style={{ paddingBottom }}
    >
      {children}
      {(cancel || confirm) && (
        <div data-testid="dialog-article-buttons" ref={buttonsRef} className={cn.Buttons}>
          {cancel && (
            <Button
              data-testid="dialog-article-cancel"
              blurAfterClick
              preventDefault
              text={cancel.text}
              color="tertiary"
              size="md"
              onClick={cancel.fn}
            />
          )}
          {confirm && (
            <Button
              data-testid="dialog-article-confirm"
              blurAfterClick
              preventDefault
              text={confirm.text}
              color="primary"
              size="md"
              onClick={confirm.fn}
            />
          )}
        </div>
      )}
    </div>
  );
};
