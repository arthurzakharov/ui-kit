import { describe, it, expect } from 'vitest';
import { containsHtml, isHtmlString, isString } from '@utils/functions/functions.util';

describe('isString', () => {
  it('returns true for string values', () => {
    expect(isString('hello')).toBe(true);
  });

  it('returns false for non-string values', () => {
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString({})).toBe(false);
  });
});

describe('containsHtml', () => {
  it('returns true for strings containing HTML tags', () => {
    expect(containsHtml('<div>Hello</div>')).toBe(true);
    expect(containsHtml('<span class="x">Test</span>')).toBe(true);
  });

  it('returns false for plain text', () => {
    expect(containsHtml('Just a simple string')).toBe(false);
  });

  it('does not treat comparison operators as HTML', () => {
    expect(containsHtml('2 < 3 and 5 > 1')).toBe(false);
  });
});

describe('isHtmlString', () => {
  it('returns true only for strings containing HTML', () => {
    expect(isHtmlString('<p>Text</p>')).toBe(true);
  });

  it('returns false for plain strings', () => {
    expect(isHtmlString('plain text')).toBe(false);
  });

  it('returns false for non-string values', () => {
    expect(isHtmlString(123)).toBe(false);
    expect(isHtmlString(null)).toBe(false);
  });
});
