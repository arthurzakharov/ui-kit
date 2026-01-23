import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Converter } from '@utils/converter/converter.util';

describe('Converter', () => {
  describe('mask', () => {
    it('should return correct mask for day precision', () => {
      expect(Converter.mask('day')).toEqual('TT/MM/JJJJ');
    });

    it('should return correct mask for month precision', () => {
      expect(Converter.mask('month')).toEqual('MM/JJJJ');
    });
  });

  describe('Boolean', () => {
    it('ToBooleanString', () => {
      expect(Converter.Boolean.ToBooleanString(true)).toEqual('true');
      expect(Converter.Boolean.ToBooleanString(false)).toEqual('false');
    });

    it('ToBooleanNumber', () => {
      expect(Converter.Boolean.ToBooleanNumber(true)).toEqual(1);
      expect(Converter.Boolean.ToBooleanNumber(false)).toEqual(0);
    });

    it('ToBooleanNumberString', () => {
      expect(Converter.Boolean.ToBooleanNumberString(true)).toEqual('1');
      expect(Converter.Boolean.ToBooleanNumberString(false)).toEqual('0');
    });
  });

  describe('BooleanString', () => {
    it('ToBoolean', () => {
      expect(Converter.BooleanString.ToBoolean('true')).toBe(true);
      expect(Converter.BooleanString.ToBoolean('True')).toBe(true);
      expect(Converter.BooleanString.ToBoolean('false')).toBe(false);
      expect(Converter.BooleanString.ToBoolean('False')).toBe(false);
      expect(Converter.BooleanString.ToBoolean('random')).toBe(false);
      expect(Converter.BooleanString.ToBoolean('')).toBe(false);
    });

    it('ToBooleanNumberString', () => {
      expect(Converter.BooleanString.ToBooleanNumberString('true')).toBe('1');
      expect(Converter.BooleanString.ToBooleanNumberString('True')).toBe('1');
      expect(Converter.BooleanString.ToBooleanNumberString('false')).toBe('0');
      expect(Converter.BooleanString.ToBooleanNumberString('False')).toBe('0');
      expect(Converter.BooleanString.ToBooleanNumberString('random')).toBe('0');
      expect(Converter.BooleanString.ToBooleanNumberString('')).toBe('0');
    });
  });

  describe('BooleanNumber', () => {
    it('ToBoolean', () => {
      expect(Converter.BooleanNumber.ToBoolean(1)).toBe(true);
      expect(Converter.BooleanNumber.ToBoolean(0)).toBe(false);
      expect(Converter.BooleanNumber.ToBoolean(5)).toBe(false);
      expect(Converter.BooleanNumber.ToBoolean(NaN)).toBe(false);
    });

    it('ToBooleanString', () => {
      expect(Converter.BooleanNumber.ToBooleanString(1)).toBe('true');
      expect(Converter.BooleanNumber.ToBooleanString(0)).toBe('false');
      expect(Converter.BooleanNumber.ToBooleanString(5)).toBe('false');
      expect(Converter.BooleanNumber.ToBooleanString(NaN)).toBe('false');
    });

    it('ToBooleanNumberString', () => {
      expect(Converter.BooleanNumber.ToBooleanNumberString(1)).toBe('1');
      expect(Converter.BooleanNumber.ToBooleanNumberString(0)).toBe('0');
      expect(Converter.BooleanNumber.ToBooleanNumberString(5)).toBe('0');
      expect(Converter.BooleanNumber.ToBooleanNumberString(NaN)).toBe('0');
    });
  });

  describe('DateSting', () => {
    describe('ToDate', () => {
      it('should convert valid date string to Date object', () => {
        const dateStr = '15/01/2022';
        const result = Converter.DateSting.ToDate(dateStr);
        expect(result).toBeInstanceOf(Date);
        expect(result?.getDate()).toEqual(15);
        expect(result?.getMonth()).toEqual(0);
        expect(result?.getFullYear()).toEqual(2022);
      });

      it('should return null for invalid date string', () => {
        expect(Converter.DateSting.ToDate('2022/01/15')).toBeNull();
        expect(Converter.DateSting.ToDate('01/15/2022')).toBeNull();
        expect(Converter.DateSting.ToDate('32/01/2022')).toBeNull();
        expect(Converter.DateSting.ToDate('invalid')).toBeNull();
      });
    });

    describe('ToDateStringUSFormat', () => {
      it('should reformat date string', () => {
        expect(Converter.DateSting.ToDateStringUSFormat('15/01/2022')).toEqual('2022/01/15');
        expect(Converter.DateSting.ToDateStringUSFormat('33/44/2222')).toEqual('2222/44/33');
      });
    });

    describe('ToNumber', () => {
      it('should return timestamp for valid date', () => {
        const dateStr = '15/01/2022';
        const result = Converter.DateSting.ToNumber(dateStr);
        expect(result).toBeGreaterThan(0);
      });

      it('should return 0 for invalid date', () => {
        expect(Converter.DateSting.ToNumber('2022/01/15')).toEqual(0);
        expect(Converter.DateSting.ToNumber('01/15/2022')).toEqual(0);
        expect(Converter.DateSting.ToNumber('32/01/2022')).toEqual(0);
        expect(Converter.DateSting.ToNumber('invalid')).toEqual(0);
      });
    });

    describe('ToMonthStyle', () => {
      it('should return month and year', () => {
        expect(Converter.DateSting.ToMonthStyle('15/01/2022')).toEqual('01/2022');
        // TODO: Next 3 cases are inlogic. This is a place for future updates
        expect(Converter.DateSting.ToMonthStyle('2022/01/15')).toEqual('01/15');
        expect(Converter.DateSting.ToMonthStyle('01/15/2022')).toEqual('15/2022');
        expect(Converter.DateSting.ToMonthStyle('32/01/2022')).toEqual('01/2022');
      });
      it('should handle empty string', () => {
        expect(Converter.DateSting.ToMonthStyle('')).toEqual('');
        expect(Converter.DateSting.ToMonthStyle('invalid')).toEqual('');
      });
    });

    describe('ToDayStyle', () => {
      it('should return first day of month', () => {
        expect(Converter.DateSting.ToDayStyle('01/2022')).toEqual('01/01/2022');
        // TODO: Next 3 cases are inlogic. Same as with ToMonthStyle. This is a place for future updates
        expect(Converter.DateSting.ToDayStyle('2022/01/15')).toEqual('01/2022/01');
        expect(Converter.DateSting.ToDayStyle('01/15/2022')).toEqual('01/01/15');
        expect(Converter.DateSting.ToDayStyle('32/01/2022')).toEqual('01/32/01');
      });
      it('should handle empty string', () => {
        expect(Converter.DateSting.ToDayStyle('')).toBe('');
        expect(Converter.DateSting.ToDayStyle('invalid')).toBe('');
      });
    });
  });

  describe('DateRelative', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2022, 5, 15, 12, 0, 0));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should handle "today"', () => {
      const resultStart = Converter.DateRelative.ToDate('today', true);
      const resultEnd = Converter.DateRelative.ToDate('today', false);
      const resultDefault = Converter.DateRelative.ToDate('today');
      expect(resultStart.getHours()).toBe(0);
      expect(resultStart.getDate()).toBe(15);
      expect(resultEnd.getHours()).toBe(23);
      expect(resultEnd.getDate()).toBe(15);
      expect(resultDefault.getHours()).toBe(0);
      expect(resultDefault.getDate()).toBe(15);
    });

    it('should handle "no limit"', () => {
      const start = Converter.DateRelative.ToDate('no limit', true);
      expect(start.getFullYear()).toEqual(1822);

      const end = Converter.DateRelative.ToDate('no limit', false);
      expect(end.getFullYear()).toEqual(2222);
    });

    it('should handle relative days', () => {
      const start = Converter.DateRelative.ToDate('20 day', true);
      expect(start.getDate()).toBe(26);
      expect(start.getMonth()).toBe(4);
      expect(start.getFullYear()).toBe(2022);

      const end = Converter.DateRelative.ToDate('20 day', false);
      expect(end.getDate()).toBe(5);
      expect(end.getMonth()).toBe(6);
      expect(end.getFullYear()).toBe(2022);
    });

    it('should handle relative month', () => {
      const start = Converter.DateRelative.ToDate('10 month', true);
      expect(start.getDate()).toBe(15);
      expect(start.getMonth()).toBe(7);
      expect(start.getFullYear()).toBe(2021);

      const end = Converter.DateRelative.ToDate('10 month', false);
      expect(end.getDate()).toBe(15);
      expect(end.getMonth()).toBe(3);
      expect(end.getFullYear()).toBe(2023);
    });

    it('should handle relative year', () => {
      const start = Converter.DateRelative.ToDate('10 year', true);
      expect(start.getDate()).toBe(15);
      expect(start.getMonth()).toBe(5);
      expect(start.getFullYear()).toBe(2012);

      const end = Converter.DateRelative.ToDate('10 year', false);
      expect(end.getDate()).toBe(15);
      expect(end.getMonth()).toBe(5);
      expect(end.getFullYear()).toBe(2032);
    });

    it('should handle specific date', () => {
      const result = Converter.DateRelative.ToDate('20/01/2023 date', true);
      expect(result.getDate()).toBe(20);
      expect(result.getMonth()).toBe(0);
      expect(result.getFullYear()).toBe(2023);
    });

    it('should return today date if specific date can not be parsed', () => {
      const result = Converter.DateRelative.ToDate('invalid');
      expect(result.getDate()).toBe(15);
      expect(result.getMonth()).toBe(5);
      expect(result.getFullYear()).toBe(2022);
    });
  });

  describe('Date', () => {
    it('ToDateString', () => {
      const date = new Date(2022, 0, 5);
      expect(Converter.Date.ToDateString(date)).toBe('05/01/2022');
    });
  });

  describe('Answer', () => {
    describe('FromMultipleToArray', () => {
      it('should return array of elements if separator is correct (", ")', () => {
        expect(Converter.Answer.FromMultipleToArray('a, b, c')).toEqual(['a', 'b', 'c']);
      });

      it('should return string as single array element if string has no correct separator', () => {
        expect(Converter.Answer.FromMultipleToArray('a,b,c')).toEqual(['a,b,c']);
        expect(Converter.Answer.FromMultipleToArray('abc')).toEqual(['abc']);
        expect(Converter.Answer.FromMultipleToArray('')).toEqual(['']);
      });
    });

    describe('FromArrayToMultiple', () => {
      it('should return joined string from array elements', () => {
        expect(Converter.Answer.FromArrayToMultiple(['a', 'b', 'c'])).toBe('a, b, c');
      });

      it('should return empty string for empty array', () => {
        expect(Converter.Answer.FromArrayToMultiple([])).toBe('');
      });
    });
  });
});
