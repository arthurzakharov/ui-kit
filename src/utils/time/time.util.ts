export type TimeFormat = 'utc' | 'local';

export abstract class Time {
  public static date(day: number, month: number, year: number, endDayTime: boolean = false): Date {
    const date = new Date();
    date.setUTCFullYear(year);
    date.setUTCMonth(month);
    date.setUTCDate(day);
    return endDayTime ? Time.endOfDay(date, 'utc') : Time.startOfDay(date, 'utc');
  }

  public static startOfDay(date: Date, timeFormat: TimeFormat = 'local'): Date {
    const tempDate = new Date(date);
    switch (timeFormat) {
      case 'utc':
        tempDate.setUTCHours(0, 0, 0, 0);
        break;
      case 'local':
        tempDate.setHours(0, 0, 0, 0);
        break;
    }
    return tempDate;
  }

  public static endOfDay(date: Date, timeFormat: TimeFormat = 'local'): Date {
    const tempDate = new Date(date);
    switch (timeFormat) {
      case 'utc':
        tempDate.setUTCHours(23, 59, 59, 0);
        break;
      case 'local':
        tempDate.setHours(23, 59, 59, 0);
        break;
    }
    return tempDate;
  }
}
