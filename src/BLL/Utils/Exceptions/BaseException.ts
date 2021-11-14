/**
 * Extension on the error class to create custom errors
 */
export default class BaseException extends Error {
  /**
   * Constructor for the BaseException class
   * @param {string} name - The name of the exception
   * @param {string} message - The message to display
   * @param {error} originalError - The original error
   * @param {object} data - The data to add to the error}
   */
  constructor(
    name: string,
    message: string,
    error: Error,
    data?: unknown
  ) {
    super(
      `${
        name + message + +`${data !== null ? `\n${JSON.stringify(data)}` : ''}`
      }\n${error.message}`
    );
    this.name = this.constructor.name;
    this.message = message;
  }
}
