import { describe, it, expect, vi } from 'vitest';
import { containsHtml, isHtmlString, isString, withControl } from '@utils/functions/functions.util';

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

describe('withControl', () => {
  it('calls handler without event when no config provided', () => {
    const handler = vi.fn();
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      currentTarget: {
        blur: vi.fn(),
      },
    };

    withControl(handler)(event as never);

    expect(handler).toHaveBeenCalledWith();
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopPropagation).not.toHaveBeenCalled();
    expect(event.currentTarget.blur).not.toHaveBeenCalled();
  });

  it('passes event to handler when withEvent is enabled', () => {
    const handler = vi.fn();
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      currentTarget: {
        blur: vi.fn(),
      },
    };

    withControl(handler, { withEvent: true })(event as never);

    expect(handler).toHaveBeenCalledWith(event);
  });

  it('applies selected control actions before calling handler', () => {
    const callOrder: string[] = [];
    const handler = vi.fn(() => {
      callOrder.push('handler');
    });
    const event = {
      preventDefault: vi.fn(() => {
        callOrder.push('prevent');
      }),
      stopPropagation: vi.fn(() => {
        callOrder.push('stop');
      }),
      currentTarget: {
        blur: vi.fn(() => {
          callOrder.push('blur');
        }),
      },
    };

    withControl(handler, { prevent: true, stop: true, blur: true })(event as never);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.currentTarget.blur).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith();
    expect(callOrder).toEqual(['prevent', 'stop', 'blur', 'handler']);
  });
});
