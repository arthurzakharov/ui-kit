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

type ControlAction = 'prevent' | 'stop' | 'blur';

/**
 * A higher-order function to wrap event handlers with common event control logic.
 */
export const withControl =
  <E extends SyntheticEvent<HTMLElement>>(handler: (e: E) => void, ...actions: ControlAction[]) =>
  (e: E): void => {
    if (actions.includes('prevent')) e.preventDefault();
    if (actions.includes('stop')) e.stopPropagation();
    if (actions.includes('blur')) e.currentTarget.blur();

    handler(e);
  };
