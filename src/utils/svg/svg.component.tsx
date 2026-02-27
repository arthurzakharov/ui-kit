import { cloneElement, isValidElement, type ReactElement, type SVGProps } from 'react';
import clsx from 'clsx';
import type { Base } from '@utils/types';

export interface SvgProps extends Base {
  icon?: ReactElement<SVGProps<SVGSVGElement>> | null;
}

/**
 * Reuses a supplied SVG element, merging our className while preserving the original props.
 * Returns null if no icon is provided, allowing for conditional rendering without extra checks.
 */
export const Svg = (props: SvgProps) => {
  const { icon = null, className = '', ...rest } = props;

  return isValidElement(icon)
    ? cloneElement<SVGProps<SVGSVGElement>>(icon, {
        className: clsx(className, icon.props.className),
        ...rest,
      })
    : icon;
};
