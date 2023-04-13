import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import 'reflect-metadata';

import { ErrorHandler } from './errorHandler';
import { RoutesErrorHandler } from './routesErrorHandler';
import ILogger from '../../shared/domain/ILogger';
import { UtilsDependency as utilsContainer, DataSourceDependency as dsContainer } from '../dependencyInjection';
import { registerRoutes } from '../routes';

export class Server {
  private readonly port: number;
  public app = express();
  private logger: ILogger;

  constructor(port: number) {
    this.logger = utilsContainer.get('Logger');
    const router = express.Router();
    this.port = port;
    this.app.use(cors({ origin: true }));
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(morgan('dev'));
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

  stop = (): void => {
    this.logger.info('Stopping server...');
    process.exit();
  };

  databases = async (): Promise<void> => {
    this.logger.info('Initializing databases...');
    const crMasterClient = dsContainer.get('DataSource.CRMaster.Client');
    const infocallClient = dsContainer.get('DataSource.Infocall.Client');
    const scoringClient = dsContainer.get('DataSource.Scoring.Client');

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
