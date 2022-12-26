import winston, { Logger as WinstonLoggerType } from 'winston';
import ILogger from '@shared/domain/ILogger';
import config from '@app/config';

class WinstonLogger implements ILogger {
  private logger: WinstonLoggerType;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf((info) => {
          if (typeof info.message === 'object') {
            info.message = JSON.stringify(info.message, null, 2);
          }
          return info.message;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'logs/info.log',
          level: 'info',
        }),
      ],
    });
  }

  private template(message: string) {
    const date = new Date();
    const locale = config.LOCALE || 'es-CL';
    const dateFormatted = new Intl.DateTimeFormat(locale, {
      timeZone: config.TIME_ZONE || 'America/Santiago',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(date !== null ? date : new Date()));

    return `${dateFormatted} | ${message}`;
  }

  error(message: string | Error | undefined) {
    this.logger.error(this.template(message as string));
  }

  info(message: unknown) {
    this.logger.info(this.template(message as string));
  }
}
export default WinstonLogger;
