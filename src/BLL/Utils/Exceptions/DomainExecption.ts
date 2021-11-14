import BLLLogger from '../Tools/BLLLogger';
import BaseException from './BaseException';
/**
 * Domain Exception
 */
export default class DomainException extends BaseException {
  /**
   * Construtor
   * @param {string} name - Name of the exception
   * @param {string} message - Message of the exception
   * @param {Error} error - Error of the exception
   * @param {unknown|undefined} data - Data of the exception
   */
  constructor(
    name: string,
    message: string,
    error: Error,
    data?: unknown | undefined
  ) {
    super(name, message, error, data);
    this.name = 'DomainException';
    this.message = message;
    BLLLogger.ErrorAsync(this.name, `${this.message}, ${error}, ${data}`);
  }
}
