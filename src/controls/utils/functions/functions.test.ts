import { describe, expect, it, vi } from 'vitest';
import { getChoiceId, clickHasNode, containsHtml } from '@controls/utils/functions';

describe('Control Utils', () => {
  describe('getChoiceId', () => {
    it('should generate correct ID format', () => {
      expect(getChoiceId('my-id', 'value', 0)).toBe('my-id-0-value');
    });

    it('should replace spaces with hyphens in value', () => {
      expect(getChoiceId('my-id', 'some value', 1)).toBe('my-id-1-some-value');
    });

    it('should handle multiple spaces correctly', () => {
      expect(getChoiceId('test', 'a  b   c', 2)).toBe('test-2-a-b-c');
    });
  });

  describe('containsHtml', () => {
    it('should return true for strings with paired HTML tags', () => {
      expect(containsHtml('<div>content</div>')).toBeTruthy();
      expect(containsHtml('text <b>bold</b>')).toBeTruthy();
    });

    it('should return true for strings with self-closing tags', () => {
      expect(containsHtml('<br />')).toBeTruthy();
      expect(containsHtml('<img src="test.jpg" />')).toBeTruthy();
      expect(containsHtml('Hello <br /> world!')).toBeTruthy();
      expect(containsHtml('<div>Hello world!</div>')).toBeTruthy();
      expect(containsHtml('Hello <b>world</b>!')).toBeTruthy();
      // TODO: Update RegExp to avoid passing tags with not HTML names
      expect(containsHtml('text <with> and symbols but not tags')).toBeTruthy();
      expect(containsHtml('text <with and /> symbols but not tags')).toBeTruthy();
    });

    it('should return false for plain strings', () => {
      expect(containsHtml('plain text')).toBeFalsy();
      expect(containsHtml('text with > and < symbols but not tags')).toBeFalsy();
      expect(containsHtml('text < with > and < symbols but not tags')).toBeFalsy();
      expect(containsHtml('text < with /and> < symbols but not tags')).toBeFalsy();
    });

    it('should return false for empty or undefined input', () => {
      expect(containsHtml('')).toBeFalsy();
      expect(containsHtml(undefined)).toBeFalsy();
    });
  });

  describe('clickHasNode', () => {
    it('should return false if ref.current is null', () => {
      const event = { target: {} } as MouseEvent | TouchEvent | FocusEvent;
      const ref = { current: null };
      expect(clickHasNode(event, ref)).toBeFalsy();
    });

    it('should return true if element contains target', () => {
      const target = {};
      const contains = vi.fn().mockReturnValue(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ref = { current: { contains } } as any;
      const event = { target } as MouseEvent | TouchEvent | FocusEvent;

      expect(clickHasNode(event, ref)).toBeTruthy();
      expect(contains).toHaveBeenCalledWith(target);
    });

    it('should return false if element does not contain target', () => {
      const target = {};
      const contains = vi.fn().mockReturnValue(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ref = { current: { contains } } as any;
      const event = { target } as MouseEvent | TouchEvent | FocusEvent;

      expect(clickHasNode(event, ref)).toBeFalsy();
      expect(contains).toHaveBeenCalledWith(target);
    });
  });
});
