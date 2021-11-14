import BaseException from '../BaseException';

/**
 * FileWriterException
 */
export default class FileWriterException extends BaseException {
  /**
   * constructor
   * @param {string} name - The name of the file
   * @param {string} message - The message of the exception
   * @param {Error} error - The error
   * @param {unknown|undefined} data - The data
   */
  constructor(
    name: string,
    message: string,
    error: Error,
    data?: unknown | undefined
  ) {
    super(name, message, error, data);
    this.name = 'FileWriterException';
    this.message = message;
  }
}
