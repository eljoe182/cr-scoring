import { Request, Response, NextFunction } from 'express';
import { UtilsDependency as container } from '../dependencyInjection';
import ILogger from '../../shared/domain/ILogger';

export const ErrorHandler = (error: Error | any, req: Request, res: Response, _next: NextFunction): Response => {
  const logger: ILogger = container.get('Logger');
  logger.error(req.originalUrl);
  logger.error(error.stack);
  return res.status(500).json({ message: error.message });
};
