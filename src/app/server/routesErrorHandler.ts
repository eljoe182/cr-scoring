import { NextFunction, Response, Request } from 'express';

import Logger from '@shared/infrastructure/logger/WinstonLogger';
import container from '@app/dependencyInjection/shared/index';

const logger: Logger = container.get('Logger');

export const RoutesErrorHandler = (req: Request, res: Response, _next: NextFunction): Response => {
  printRequest(req);
  return res.status(400).send({
    error: `Method '${req.method}' invalid for request '${req.originalUrl}'`,
  });
};

const printRequest = (req: Request): void => {
  logger.error(`Error on in request: ${req.originalUrl}`);
  logger.error(`Request method: ${req.method}`);
};
