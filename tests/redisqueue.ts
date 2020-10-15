/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @licence LGPL-3.0-only https://opensource.org/licenses/LGPL-3.0
 */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { createClient } from 'redis-mock';
import { RedisQueue } from '../src';

describe('RedisQueue test', () => {
  const client = createClient();
  const redisQueue = new RedisQueue(client);

  const list = 'test';

  client.rpush(list, ...[
    'item1',
    'item2',
    'item3'
  ]);

  describe('testPeek', () => {
    it('should return the value of the first key on successive calls', async () => {
      const firstCall = await redisQueue.peek(list);
      const secondCall = await redisQueue.peek(list);

      expect(firstCall)
        .to
        .be
        .a('string')
        .and
        .equal(secondCall);
    });
  });

  describe('testPush', () => {
    it('should append an item to the end of the list', async () => {
      const pushIndex = await redisQueue.push(list, 'item4');

      // Reset the test state
      client.rpop(list);

      expect(pushIndex)
        .to
        .be
        .a('number')
        .and
        .equal(4);
    });
  });

  describe('testPop', async () => {
    it ('should delete the value of the first key and return it', async () => {
      const firstCall = await redisQueue.pop(list);
      const secondCall = await redisQueue.pop(list);
      const thirdCall = await redisQueue.pop(list);
      const fourthCall = await redisQueue.pop(list);

      expect(firstCall)
        .to
        .be
        .a('string')
        .and
        .equal('item1');


      expect(secondCall)
        .to
        .be
        .a('string')
        .and
        .equal('item2');


      expect(thirdCall)
        .to
        .be
        .a('string')
        .and
        .equal('item3');

      expect(fourthCall)
        .to
        .equal(null);
    });
  });
});