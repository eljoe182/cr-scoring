import { Server } from './app/server';
import config from './app/config';

try {
  new Server(Number(config.PORT)).start();
} catch (error) {
  console.log(error);
  process.exit(1);
}

process.on('uncaughtException', (error) => {
  console.log(error);
  process.exit(1);
});
