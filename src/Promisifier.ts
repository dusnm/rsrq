/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @licence LGPL-3.0-only https://opensource.org/licenses/LGPL-3.0
 */
import { promisify } from 'util';

class Promisifier {
  /**
   * Turns a callback based method
   * into a promise based one
   * through reflection
   *
   * @param target
   * @param method
   */
  public static promisifyMethodByReflection(target: Object, method: string): Function | null {
    const reflectedMethod = Reflect.get(target, method);

    if ('function' !== typeof reflectedMethod) {
      return null;
    }

    return promisify(reflectedMethod).bind(target);
  }
}

export {
  Promisifier
};