import { RedisClientType } from 'redis';
import RedisClient from './RedisClient';

export class RedisRepository {
  private client: RedisClientType;
  constructor(private redisClient: RedisClient) {
    this.client = this.redisClient.getClient();
  }

  public async get(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      this.client.connect();
      this.client.get(key).then((result) => {
        this.client.disconnect();
        resolve(result);
      });
    });
  }

  public async set(key: string, value: string): Promise<void> {
    return new Promise((resolve) => {
      this.client.connect();
      this.client.set(key, value).then(() => {
        this.client.disconnect();
        resolve();
      });
    });
  }

  public async del(key: string): Promise<void> {
    return new Promise((resolve) => {
      this.client.connect();
      this.client.del(key).then(() => {
        this.client.disconnect();
        resolve();
      });
    });
  }
}
