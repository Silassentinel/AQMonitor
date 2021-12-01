import BaseException from '../BaseException';
import BLLLogger from '../../Tools/BLLLogger';
/**
 * PM25Exception
 */
export default class PM25Exception extends BaseException {
  /**
   * Ctor
   * @param {string} name - Exception name
   * @param {string} message - Exception message
   * @param {error} error - Error
   * @param {unknown} data - Some additional data
   */
  constructor(
    name: string,
    message: string,
    error: Error,
    data?: unknown | undefined
  ) {
    super(name, message, error, data);
    if (name === '' || name === undefined) {
      this.name = 'PM25Exception';
    }
    this.message = message;
    BLLLogger.ErrorAsync(this.name, `${this.message}, ${error}, ${data}`);
  }
}
