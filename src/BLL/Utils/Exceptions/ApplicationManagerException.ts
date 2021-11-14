import BLLLogger from '../Tools/BLLLogger';
import BaseException from './BaseException';

/**
 * ApplicationManagerException
 */
export default class ApplicationManagerException extends BaseException {
  /**
   * ApplicationManagerException constructor.
   * @param {string} name - Exception name.
   * @param {string} message - Exception message.
   * @param {Error} error - Error.
   * @param {unknown|undefined} data - Exception data.
   */
  constructor(
    name: string,
    message: string,
    error: Error,
    data?: unknown | undefined
  ) {
    super(name, message, error, data);
    this.name = 'ApplicationManagerException';
    this.message = message;
    BLLLogger.ErrorAsync(this.name, `${this.message}, ${error}, ${data}`);
  }
}
