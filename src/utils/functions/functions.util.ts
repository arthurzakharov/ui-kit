import type { Base } from '@utils/types';
import type { SyntheticEvent } from 'react';

/**
 * Type guard: checks whether value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks whether a string contains HTML-like markup
 * (basic heuristic, not a full HTML parser)
 */
export function containsHtml(value: string): boolean {
  const htmlRegex = /<\/?[a-z][\s\S]*>/i;
  return htmlRegex.test(value);
}

/**
 * Combined helper:
 * Checks if unknown value is a string containing HTML markup
 */
export function isHtmlString(value: unknown): value is string {
  return isString(value) && containsHtml(value);
}

/**
 * A higher-order function to wrap event handlers with common event control logic.
 */
type WithControlConfig = {
  prevent?: boolean;
  stop?: boolean;
  blur?: boolean;
  withEvent?: boolean;
};
export const withControl =
  <E extends SyntheticEvent<HTMLElement>>(handler: (e?: E) => void, config?: WithControlConfig) =>
  (e: E): void => {
    if (config?.prevent) e.preventDefault();
    if (config?.stop) e.stopPropagation();
    if (config?.blur) e.currentTarget.blur();

    if (config?.withEvent) {
      handler(e);
    } else {
      handler();
    }
  };

/**
 * A helper function to extract a specific prop from a Base object, with an optional default value.
 */
export function baseProps(base: Base, key: keyof Base, or?: Base[keyof Base]) {
  return base[key] ?? or;
}
