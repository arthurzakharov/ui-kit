import { Time } from '@utils/time/time.util';

type DatePrecision = 'month' | 'day';

type MaskExplanationKey = 'd' | 'm' | 'y';

type MaskExplanation = [string, MaskExplanationKey, MaskExplanationKey, MaskExplanationKey?];

export abstract class Converter {
  private static formatNumberWithLeadingZero(number: number): string {
    return String(number).padStart(2, '0');
  }

  private static maskExplanation(): MaskExplanation {
    return ['/', 'd', 'm', 'y'];
  }

  public static mask(precision: DatePrecision): string {
    return precision === 'day' ? 'TT/MM/JJJJ' : 'MM/JJJJ';
  }

  public static get Boolean() {
    return {
      ToBooleanString: (val: boolean): string => {
        return val ? 'true' : 'false';
      },
      ToBooleanNumber: (val: boolean): number => {
        return val ? 1 : 0;
      },
      ToBooleanNumberString: (val: boolean): string => {
        return val ? '1' : '0';
      },
    };
  }

  public static get BooleanString() {
    const toLower = (val: string): string => val.toLowerCase();
    return {
      ToBoolean: (val: string): boolean => {
        if (toLower(val) === 'true') return true;
        if (toLower(val) === 'false') return false;
        return false;
      },
      ToBooleanNumberString: (val: string): string => {
        if (toLower(val) === 'true') return '1';
        if (toLower(val) === 'false') return '0';
        return '0';
      },
    };
  }

  public static get BooleanNumber() {
    return {
      ToBoolean: (val: number): boolean => {
        if (val === 1) return true;
        if (val === 0) return false;
        return false;
      },
      ToBooleanString: (val: number): string => {
        if (val === 1) return 'true';
        if (val === 0) return 'false';
        return 'false';
      },
      ToBooleanNumberString: (val: number): string => {
        if (val === 1) return '1';
        if (val === 0) return '0';
        return '0';
      },
    };
  }

  /* DD/MM/YYYY is the only allowed and expected format of date string */
  public static get DateSting() {
    return {
      ToDate: (dateString: string): Date | null => {
        const [separator, ...explanations] = Converter.maskExplanation();
        const dateArray = dateString.split(separator);
        const { day, month, year } = explanations.reduce(
          (date, key, currentIndex) => {
            switch (key) {
              case 'd':
                date.day = Number(dateArray[currentIndex]) || NaN;
                break;
              case 'm':
                date.month = Number(dateArray[currentIndex]) || NaN;
                break;
              case 'y':
                date.year = Number(dateArray[currentIndex]) || NaN;
                break;
            }
            return date;
          },
          {
            day: NaN,
            month: NaN,
            year: NaN,
          },
        );

        const convertedDate = Time.date(day, month - 1, year);

        const localeConvertedDate = convertedDate.toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        });

        return localeConvertedDate === [month, day, year].join(separator) ? convertedDate : null;
      },
      ToDateStringUSFormat: (dateString: string): string => {
        const [separator] = Converter.maskExplanation();
        const [day, month, year] = dateString.split(separator);
        return [year, month, day].join(separator);
      },
      ToNumber: (dateString: string): number => {
        const date = Converter.DateSting.ToDate(dateString);
        return date ? date.getTime() : 0;
      },
      ToMonthStyle: (dateString: string): string => {
        const [separator] = Converter.maskExplanation();
        const [, month, year] = dateString.split(separator);
        return month && year ? [month, year].join(separator) : '';
      },
      ToDayStyle: (dateString: string): string => {
        const [separator] = Converter.maskExplanation();
        const [month, year] = dateString.split(separator);
        return month && year ? ['01', month, year].join(separator) : '';
      },
    };
  }

  public static get DateRelative() {
    return {
      ToDate: (dateRelative: string, setFirstHoursOfDay: boolean = true): Date => {
        const today = setFirstHoursOfDay ? Time.startOfDay(new Date()) : Time.endOfDay(new Date());
        switch (dateRelative) {
          case 'today':
            return today;
          case 'no limit':
            if (setFirstHoursOfDay) today.setFullYear(today.getFullYear() - 200);
            if (!setFirstHoursOfDay) today.setFullYear(today.getFullYear() + 200);
            return today;
          default:
            if (dateRelative.includes('day')) {
              const [dayShift] = dateRelative.split(' ');
              today.setDate(today.getDate() + (setFirstHoursOfDay ? -dayShift : +dayShift));
            }
            if (dateRelative.includes('month')) {
              const [monthShift] = dateRelative.split(' ');
              today.setMonth(today.getMonth() + (setFirstHoursOfDay ? -monthShift : +monthShift));
            }
            if (dateRelative.includes('year')) {
              const [yearShift] = dateRelative.split(' ');
              today.setFullYear(today.getFullYear() + (setFirstHoursOfDay ? -yearShift : +yearShift));
            }
            if (dateRelative.includes('date')) {
              const [exactDate] = dateRelative.split(' ');
              const [day, month, year] = exactDate.split('/');
              today.setDate(Number(day));
              today.setMonth(Number(month) - 1);
              today.setFullYear(Number(year));
            }
            return today;
        }
      },
    };
  }

  public static get Date() {
    return {
      ToDateString: (date: Date): string => {
        const [separator, ...explanations] = Converter.maskExplanation();
        return explanations
          .map((key) => {
            switch (key) {
              case 'd':
                return Converter.formatNumberWithLeadingZero(date.getDate());
              case 'm':
                return Converter.formatNumberWithLeadingZero(date.getMonth() + 1);
              case 'y':
                return date.getFullYear();
            }
          })
          .join(separator);
      },
    };
  }

  public static get Answer() {
    const separator = ', ';
    return {
      FromMultipleToArray: (value: string): string[] => value.split(separator),
      FromArrayToMultiple: (value: string[]): string => value.join(separator),
    };
  }
}
