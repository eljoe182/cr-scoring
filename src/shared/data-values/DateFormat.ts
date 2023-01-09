import config from '@app/config';

export default class DateFormat {

  static dateTime(date: Date): string {
    const locale = config.LOCALE || 'en-US';
    return new Intl.DateTimeFormat(locale, {
      timeZone: config.TIME_ZONE || 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(date !== null ? date : new Date()));
  }

  static date(date: Date): string {
    const locale = config.LOCALE || 'en-US';
    return new Intl.DateTimeFormat(locale, {
      timeZone: config.TIME_ZONE || 'UTC',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(date !== null ? date : new Date()));
  }

  static time(date: Date): string {
    const locale = config.LOCALE || 'en-US';
    return new Intl.DateTimeFormat(locale, {
      timeZone: config.TIME_ZONE || 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date(date !== null ? date : new Date()));
  }
}
