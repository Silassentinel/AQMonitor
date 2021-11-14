import BaseException from '../BaseException';

/**
 * FileWriterException
 */
export default class BLLLoggerException extends BaseException {
  /**
   * constructor
   * @param {string} name - The exception name
   * @param {string} message - The exception message
   * @param {Error} error - The original error
   * @param {unknown|undefined} data - Optional additional data
   */
  constructor(
    name: string,
    message: string,
    error: Error,
    data?: unknown | undefined
  ) {
    super(name, message, error, data);
    this.name = 'BLLLoggerException';
    this.message = message;
  }
}
