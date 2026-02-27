import { type PropsWithChildren, useRef, useState } from 'react';
import { useResizeObserver, useWindowSize } from 'usehooks-ts';
import clsx from 'clsx';
import { ControlButton } from '@controls/control-button';
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

/**
 * Dialog article section with optional action buttons (cancel/confirm).
 * Automatically adjusts bottom padding on mobile to prevent button overlap.
 */
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
            <ControlButton
              data-testid="dialog-article-cancel"
              blurAfterClick
              preventDefault
              color="tertiary"
              size="md"
              onClick={cancel.fn}
            >
              {cancel.text}
            </ControlButton>
          )}
          {confirm && (
            <ControlButton
              data-testid="dialog-article-confirm"
              blurAfterClick
              preventDefault
              color="primary"
              size="md"
              onClick={confirm.fn}
            >
              {confirm.text}
            </ControlButton>
          )}
        </div>
      )}
    </div>
  );
};
