import BLLLogger from '../Tools/BLLLogger';
import BaseException from './BaseException';
/**
 * UnitOfWorkException class
 */
export default class UnitOfWorkException extends BaseException {
  /**
   * Construtor
   * @param {string} name - The name of the exception
   * @param {string} message - The message of the exception
   * @param {Error} error - The original error
   * @param {unknown|undefined} data - Optional data to be sent to the logger
   */
  constructor(
    name: string,
    message: string,
    error: Error,
    data?: unknown | undefined
  ) {
    super(name, message, error, data);
    this.name = 'UnitOfWorkException';
    this.message = message;
    BLLLogger.ErrorAsync(this.name, `${this.message}, ${error}, ${data}`);
  }
}
