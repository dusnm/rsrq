/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @licence LGPL-3.0-only https://opensource.org/licenses/LGPL-3.0
 */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { createClient } from 'redis-mock';
import { Promisifier } from '../src/Promisifier';

describe('Promisifier test', () => {
  const redisClient = createClient();

  describe('testPromisifyMethodByReflection', () => {
    it('should promisify a callback based method by reflection', () => {
      const actualResult = Promisifier.promisifyMethodByReflection(redisClient, 'get');
      expect(actualResult)
        .to
        .be
        .a('function');
    });

    it('should return null when a method does not exist on the target', () => {
      const actualResult = Promisifier.promisifyMethodByReflection(redisClient, 'foo');

      expect(actualResult)
        .to
        .equal(null);
    });
  });
});