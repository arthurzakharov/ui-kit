import { Children, isValidElement, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import { baseProps } from '@utils/functions';
import type { Base, Size } from '@utils/types';
import cn from '@components/form-row/form-row.module.css';

export type FormRowWidth = '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1';

export interface FormRowProps extends PropsWithChildren<Base> {
  gap: Size;
  /**
   * Force the desktop width of each child individually.
   *
   * Pass an array of fractions, one per valid child, in order. Supported values
   * cover every valid fraction of a four-column grid:
   * `'1/2'`, `'1/3'`, `'2/3'`, `'1/4'`, `'2/4'`, `'3/4'` and `'1'`.
   *
   * If the array length does not match the number of valid children, the array
   * contains an unknown value, or the fractions sum to more than 1, a warning
   * is logged and the prop is ignored — the row falls back to the default
   * behaviour where all children share the row width equally.
   *
   * On mobile (< 768px) the row stacks vertically as usual; this prop only
   * affects the desktop layout.
   */
  widths?: FormRowWidth[];
}

// Each fraction expressed as twelfths so we can sum without floating-point error
// (12 is the LCM of 1, 2, 3, 4).
const WIDTH_TWELFTHS: Record<FormRowWidth, number> = {
  '1': 12,
  '1/2': 6,
  '1/3': 4,
  '2/3': 8,
  '1/4': 3,
  '2/4': 6,
  '3/4': 9,
};

const FULL = WIDTH_TWELFTHS['1'];

export const FormRow = ({ children, gap = 'sm', widths, ...base }: FormRowProps) => {
  if (Children.count(children) === 0) return null;

  const validChildren = Children.toArray(children).filter(isValidElement);

  // Decide whether to honour the `widths` prop.
  let useWidths = false;
  if (widths) {
    if (widths.length !== validChildren.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `[FormRow] \`widths\` length (${widths.length}) does not match the number of children (${validChildren.length}). Falling back to default equal-width behaviour.`,
      );
    } else {
      const unknown = widths.find((w) => !(w in WIDTH_TWELFTHS));
      if (unknown !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          `[FormRow] \`widths\` contains unknown value "${unknown}". Supported values are: ${Object.keys(WIDTH_TWELFTHS).join(', ')}. Falling back to default equal-width behaviour.`,
        );
      } else {
        const totalTwelfths = widths.reduce((sum, w) => sum + WIDTH_TWELFTHS[w], 0);
        if (totalTwelfths > FULL) {
          // eslint-disable-next-line no-console
          console.warn(
            `[FormRow] \`widths\` total (${widths.join(' + ')}) exceeds 1. Falling back to default equal-width behaviour.`,
          );
        } else {
          useWidths = true;
        }
      }
    }
  }

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'form-row')}
      className={clsx(cn.FormRow, baseProps(base, 'className'), {
        [cn.XXS]: gap === 'xxs',
        [cn.XS]: gap === 'xs',
        [cn.SM]: gap === 'sm',
        [cn.MD]: gap === 'md',
        [cn.LG]: gap === 'lg',
        [cn.XL]: gap === 'xl',
        [cn.XXL]: gap === 'xxl',
        [cn.XXXL]: gap === 'xxxl',
      })}
    >
      {validChildren.map((child, index) => (
        <div
          key={index}
          data-children-quantity={validChildren.length}
          data-width={useWidths ? widths![index] : undefined}
          className={cn.Child}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
