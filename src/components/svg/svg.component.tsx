import clsx from 'clsx';
import { cloneElement, isValidElement, type ReactElement } from 'react';

export interface SvgProps {
  icon: ReactElement<SVGElement> | null;
  className?: string;
}

export const Svg = (props: SvgProps) => {
  const { icon = null, className = '' } = props;

  return isValidElement(icon)
    ? cloneElement<SVGElement>(icon, { className: clsx(className, icon.props.className) })
    : icon;
};
