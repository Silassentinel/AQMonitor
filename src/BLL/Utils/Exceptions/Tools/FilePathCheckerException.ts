import BaseException from '../BaseException';
/**
 * Exception thrown when a file path is not valid.
 */
export default class FilePathCheckerException extends BaseException {
  /**
   * constructor
   * @param {string} name - The name of the file.
   * @param {string} message - The message of the exception.
   * @param {Error} error - The error that caused the exception.
   * @param {unknown|undefined} data - Optional additional data.
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
