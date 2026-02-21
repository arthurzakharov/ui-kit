import { describe, expect, it, vi } from 'vitest';
import { useChoice } from '@controls/hooks/use-choice';

describe('useChoice', () => {
  const id = 'test-id';

  describe('Radio', () => {
    it('should return radio type when value is string', () => {
      const cb = vi.fn();
      const { type } = useChoice('option1', id, cb);
      expect(type).toBe('radio');
    });

    it('should call callback with new value, with source specified', () => {
      const cb = vi.fn();
      const { onChoiceChange } = useChoice('option1', id, cb);
      onChoiceChange('option2', 'mouse');
      expect(cb).toHaveBeenCalledWith('option2', id, 'mouse');
    });

    it('should call callback with new value, without source specified', () => {
      const cb = vi.fn();
      const { onChoiceChange } = useChoice('option1', id, cb);
      onChoiceChange('option2');
      expect(cb).toHaveBeenCalledWith('option2', id, undefined);
    });
  });

  describe('Checkbox', () => {
    it('should return checkbox type when value is array of strings', () => {
      const cb = vi.fn();
      const { type } = useChoice(['option1'], id, cb);
      expect(type).toBe('checkbox');
    });

    it('should add value when not present', () => {
      const cb = vi.fn();
      const { onChoiceChange } = useChoice(['option1'], id, cb);
      onChoiceChange('option2', 'keyboard');
      expect(cb).toHaveBeenCalledWith(['option1', 'option2'], id, 'keyboard');
    });

    it('should remove value when present', () => {
      const cb = vi.fn();
      const { onChoiceChange } = useChoice(['option1', 'option2'], id, cb);
      onChoiceChange('option1', 'keyboard');
      expect(cb).toHaveBeenCalledWith(['option2'], id, 'keyboard');
    });

    it('should filter out empty values', () => {
      const cb = vi.fn();
      const { onChoiceChange } = useChoice(['option1'], id, cb);
      onChoiceChange('', 'mouse');
      expect(cb).toHaveBeenCalledWith(['option1'], id, 'mouse');
    });

    it('should call callback with new value, without source specified', () => {
      const cb = vi.fn();
      const { onChoiceChange } = useChoice(['option1'], id, cb);
      onChoiceChange('option2');
      expect(cb).toHaveBeenCalledWith(['option1', 'option2'], id, undefined);
    });
  });
});
