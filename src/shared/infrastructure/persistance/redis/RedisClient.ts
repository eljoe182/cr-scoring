import { RedisClientType, createClient } from 'redis';
import config from '@app/config';

class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://${config.REDIS.HOST}:${config.REDIS.PORT}`,
    });
  }

  public getClient(): RedisClientType {
    return this.client;
  }

  public async ping(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.connect();
      this.client
        .ping()
        .then((pong) => {
          this.client.disconnect();
          resolve(pong === 'PONG');
        })
        .catch((error) => {
          this.client.disconnect();
          reject(error);
        });
    });
  }
}

export default RedisClient;
