/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @licence LGPL-3.0-only https://opensource.org/licenses/LGPL-3.0
 */
import { Promisifier } from './Promisifier';
import { RedisClient } from 'redis';

class RedisQueue {
  public constructor(private readonly client: RedisClient) {
  }

  /**
   * Adds a string to the end of the redis list
   *
   * @param queue
   * @param data
   */
  public async push(queue: string, data: string): Promise<number | null> {
    const rpushAsync = Promisifier.promisifyMethodByReflection(this.client, 'rpush');

    if (null === rpushAsync) {
      return null;
    }

    try {
      return rpushAsync(queue, data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Deletes the first entry in the redis list and returns it
   *
   * @param queue
   */
  public async pop(queue: string): Promise<string | null> {
    const lpopAsync = Promisifier.promisifyMethodByReflection(this.client, 'lpop');

    if (null === lpopAsync) {
      return null;
    }

    try {
      return lpopAsync(queue);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Returns the first entry in the redis list without modifying it
   *
   * @param queue
   */
  public async peek(queue: string): Promise<string | null> {
    const lindexAsync = Promisifier.promisifyMethodByReflection(this.client, 'lindex');

    if (null === lindexAsync) {
      return null;
    }

    try {
      return lindexAsync(queue, 0);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export {
  RedisQueue
};