import BLLLogger from '../../Tools/BLLLogger';
import BaseException from '../BaseException';
/**
 * CATEGORY-REPO-EXCEPTION
 */
export default class ApiResponseRepoException extends BaseException {
  /**
   * Constructor
   * @param {string} message - The message for the exception.
   *
   */
  constructor(
    name: string,
    message: string,
    error: Error,
    data?: unknown | undefined
  ) {
    super(name, message, error, data);
    this.name = 'ApiResponseRepoException';
    this.message = message;
    BLLLogger.ErrorAsync(this.name, `${this.message}, ${error}, ${data}`);
  }
}
