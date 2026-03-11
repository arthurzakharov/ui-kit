import { describe, expect, it } from 'vitest';
import { Time } from '@utils/time/time.util';

describe('Time', () => {
  describe('date', () => {
    it('should tagCreate a date object at the start of the day (UTC) when endDayTime is false or not provided', () => {
      const day = 10;
      const month = 0;
      const year = 2022;
      const date1 = Time.date(day, month, year);
      const date2 = Time.date(day, month, year, false);

      expect([date1.getUTCDate(), date2.getUTCDate()]).toEqual([day, day]);
      expect([date1.getUTCMonth(), date2.getUTCMonth()]).toEqual([month, month]);
      expect([date1.getUTCFullYear(), date2.getUTCFullYear()]).toEqual([year, year]);
      expect([date1.getUTCHours(), date2.getUTCHours()]).toEqual([0, 0]);
      expect([date1.getUTCMinutes(), date2.getUTCMinutes()]).toEqual([0, 0]);
      expect([date1.getUTCSeconds(), date2.getUTCSeconds()]).toEqual([0, 0]);
      expect([date1.getUTCMilliseconds(), date2.getUTCMilliseconds()]).toEqual([0, 0]);
    });

    it('should tagCreate a date object at the end of the day (UTC) when endDayTime is true', () => {
      const day = 10;
      const month = 0;
      const year = 2022;
      const date = Time.date(day, month, year, true);

      expect(date.getUTCDate()).toBe(day);
      expect(date.getUTCMonth()).toBe(month);
      expect(date.getUTCFullYear()).toBe(year);
      expect(date.getUTCHours()).toBe(23);
      expect(date.getUTCMinutes()).toBe(59);
      expect(date.getUTCSeconds()).toBe(59);
      expect(date.getUTCMilliseconds()).toBe(0);
    });
  });

  describe('startOfDay', () => {
    it('should return the start of the day in UTC time when timeFormat is "utc" or not provided', () => {
      const now = new Date();
      now.setUTCHours(12, 30, 30, 500);
      const start = Time.startOfDay(now, 'utc');

      expect(start.getUTCHours()).toBe(0);
      expect(start.getUTCMinutes()).toBe(0);
      expect(start.getUTCMinutes()).toBe(0);
      expect(start.getUTCMilliseconds()).toBe(0);
    });

    it('should return the start of the day in local time when timeFormat is "local" or not provided', () => {
      const now = new Date();
      now.setUTCHours(12, 30, 30, 500);
      const start1 = Time.startOfDay(now, 'local');
      const start2 = Time.startOfDay(now);

      expect([start1.getHours(), start2.getHours()]).toEqual([0, 0]);
      expect([start1.getMinutes(), start2.getMinutes()]).toEqual([0, 0]);
      expect([start1.getSeconds(), start2.getSeconds()]).toEqual([0, 0]);
      expect([start1.getMilliseconds(), start2.getMilliseconds()]).toEqual([0, 0]);
    });

    it('should not modify the original date object', () => {
      const now = new Date();
      const originalTime = now.getTime();
      Time.startOfDay(now);
      expect(now.getTime()).toBe(originalTime);
    });
  });

  describe('endOfDay', () => {
    it('should return the end of the day in UTC time when timeFormat is "utc" or not provided', () => {
      const now = new Date();
      now.setUTCHours(12, 30, 30, 500);
      const start = Time.endOfDay(now, 'utc');

      expect(start.getUTCHours()).toBe(23);
      expect(start.getUTCMinutes()).toBe(59);
      expect(start.getUTCMinutes()).toBe(59);
      expect(start.getUTCMilliseconds()).toBe(0);
    });

    it('should return the end of the day in local time when timeFormat is "local" or not provided', () => {
      const now = new Date();
      now.setUTCHours(12, 30, 30, 500);
      const start1 = Time.endOfDay(now, 'local');
      const start2 = Time.endOfDay(now);

      expect([start1.getHours(), start2.getHours()]).toEqual([23, 23]);
      expect([start1.getMinutes(), start2.getMinutes()]).toEqual([59, 59]);
      expect([start1.getSeconds(), start2.getSeconds()]).toEqual([59, 59]);
      expect([start1.getMilliseconds(), start2.getMilliseconds()]).toEqual([0, 0]);
    });

    it('should not modify the original date object', () => {
      const now = new Date();
      const originalTime = now.getTime();
      Time.endOfDay(now);
      expect(now.getTime()).toBe(originalTime);
    });
  });
});
