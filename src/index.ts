import { Server } from '@app/server';
import config from '@config/index';

try {
  new Server(Number(config.PORT)).start();
} catch (error) {
  console.log(error);
  process.exit(1);
}

process.on('uncaughtException', (_err) => {
  process.exit(1);
});
