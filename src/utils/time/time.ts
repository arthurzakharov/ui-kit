export class Time {
  constructor() {}

  public static date(day: number, month: number, year: number, endDayTime: boolean = false): Date {
    const date = new Date();
    date.setUTCFullYear(year);
    date.setUTCMonth(month);
    date.setUTCDate(day);
    date.setUTCHours(endDayTime ? 23 : 0);
    date.setUTCMinutes(endDayTime ? 59 : 0);
    date.setUTCSeconds(endDayTime ? 59 : 0);
    date.setUTCMilliseconds(0);
    return date;
  }

  public static startOfDay(date: Date): Date {
    const tempDate = new Date(date);
    tempDate.setHours(0, 0, 0, 0);
    return tempDate;
  }

  public static endOfDay(date: Date): Date {
    const tempDate = new Date(date);
    tempDate.setHours(23, 59, 59, 0);
    return tempDate;
  }
}
