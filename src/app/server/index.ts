import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'reflect-metadata';

import { ErrorHandler } from './errorHandler';
import { RoutesErrorHandler } from './routesErrorHandler';
import ILogger from '@shared/domain/ILogger';
import container from '@app/dependencyInjection/shared';
import { registerRoutes } from '@app/routes';

export class Server {
  private readonly port: number;
  public app = express();
  private logger: ILogger;

  constructor(port: number) {
    this.logger = container.get('Logger');
    const router = express.Router();
    this.port = port;
    this.app.use(cors({ origin: true }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    registerRoutes(router);
    this.app.use(router, ErrorHandler);
    this.app.use(router, RoutesErrorHandler);
    this.databases();
  }

  start = async (): Promise<void> => {
    this.logger.info('Starting server...');
    return new Promise((resolve) => {
      this.app.listen(this.port, () => {
        this.logger.info(`Server started on port ${this.port}`);
        resolve();
      });
    });
  };

  databases = async (): Promise<void> => {
    this.logger.info('Initializing databases...');
    const crMasterClient = container.get('DataSource.CRMaster.Client');
    const infocallClient = container.get('DataSource.Infocall.Client');
    const scoringClient = container.get('DataSource.Scoring.Client');

    crMasterClient
      .initialize()
      .then(() => {
        this.logger.info('Databases mssql initialized');
      })
      .catch((error: any) => this.logger.error(error));

    infocallClient
      .initialize()
      .then(() => {
        this.logger.info('Databases mysql initialized');
      })
      .catch((error: any) => this.logger.error(error));

    scoringClient
      .initialize()
      .then(() => {
        this.logger.info('Databases mongodb initialized');
      })
      .catch((error: any) => this.logger.error(error));
  };
}
