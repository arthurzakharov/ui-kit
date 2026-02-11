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
