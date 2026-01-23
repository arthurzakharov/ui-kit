import type { PropsWithChildren, RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { useOnClickOutside, useScrollLock } from 'usehooks-ts';
import { AnimatePresence, motion } from 'motion/react';
import cn from '@components/dialog/dialog.module.css';

/**
 * TODO: Improvement for later:
 * 1 - add text fade in and when scrolling and remove this effect when bottom reached.
 * 2 - add bottom panel conditional, that will take array of text and action records for buttons
 * 3 - add other positions on all 4 corners
 * 4 - add support of @media to dialogs sizes
 */

export type DialogPosition = 'top-center' | 'center';

export type DialogSize = '1/3' | '1/2' | '2/3' | '1/1';

export interface DialogProps extends PropsWithChildren {
  rootSelector?: string;
  on?: boolean;
  onClose?: () => void;
  position?: DialogPosition;
  size?: DialogSize;
  maxWidth?: string;
  minWidth?: string;
  doNotCloseOnOutsideClick?: boolean;
  withoutCloseButton?: boolean;
}

export const Dialog = (props: DialogProps) => {
  const {
    children,
    rootSelector = '#root',
    on,
    onClose,
    position = 'top-center',
    size = '1/2',
    maxWidth = '',
    minWidth = '',
    withoutCloseButton,
    doNotCloseOnOutsideClick,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { lock, unlock } = useScrollLock({ lockTarget: 'body', autoLock: false });
  const root = document.querySelector(rootSelector);

  useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
    if (!doNotCloseOnOutsideClick) onClose?.call(null);
  });

  useEffect(() => {
    if (on) {
      lock();
    } else {
      unlock();
    }
    return () => unlock();
  }, [on, lock, unlock]);

  if (!root) return null;

  return createPortal(
    <AnimatePresence>
      {on && (
        <motion.div
          className={clsx(cn['Backdrop'], {
            [cn.BackdropPositionTopCenter]: position === 'top-center',
            [cn.BackdropPositionCenter]: position === 'center',
            [cn.BackdropSizeOneThird]: size === '1/3',
            [cn.BackdropSizeHalf]: size === '1/2',
            [cn.BackdropSizeTwoThird]: size === '2/3',
            [cn.BackdropSizeFull]: size === '1/1',
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0, type: 'spring', stiffness: 100, damping: 16 } }}
          exit={{ opacity: 0, transition: { delay: 0.4, type: 'spring', stiffness: 100, damping: 16 } }}
        >
          <motion.div
            ref={ref}
            tabIndex={0}
            className={cn.Dialog}
            style={{
              maxWidth,
              minWidth,
            }}
            initial={{ y: '100vh', scale: 0.9, opacity: 0.75 }}
            animate={{
              y: 0,
              scale: 1,
              opacity: 1,
              transition: { delay: 0.4, type: 'spring', stiffness: 100, damping: 16 },
            }}
            exit={{
              y: '100vh',
              scale: 0.9,
              opacity: 0.75,
              transition: { delay: 0, type: 'spring', stiffness: 100, damping: 16 },
            }}
          >
            {!withoutCloseButton && (
              <motion.button
                type="button"
                aria-label="Close"
                className={cn.DialogCloseButton}
                whileTap={{ scale: 1.125 }}
                onClick={() => setTimeout(() => onClose?.call(null), 125)}
              >
                <X className={cn.DialogCloseButtonIcon} />
              </motion.button>
            )}
            <div className={cn.DialogContent}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    root,
  );
};
