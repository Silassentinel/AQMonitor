// TODO - implement
// check and add from crypto demo proj
export default class HashGenerator {
  /**
   * Generates a hash from a password and a salt.
   * @param {string} salt - salt
   * @param {string} password - password to hash
   * @param {number} iterations - number of iterations
   * @param {number} keyLength - length of the key in bytes
   * @param {string} digest - hash algorithm
   * @returns {string} - hash
   */
  static generateHash(
    salt: string,
    password: string,
    iterations = 10000,
    keyLength = 64,
    digest = 'sha512'
  ): string {
    return password;
  }

  /**
   * Static method which generates a salt.
   * @param length - length of the salt
   */
  static generateSalt(length = 64): string {
    return '';
  }

  /**
   * Static method which generates a random string.
   * @param length - length of the string
   * @param chars - characters to use
   * @returns {string} - random string
   * @memberof HashGenerator
   * @static
   * @example
   * HashGenerator.generateRandomString(10, 'abcdefghijklmnopqrstuvwxyz0123456789');
   * // returns 'a1b2c3d4e5f6g7h8i9j0'
   */
  static generateRandomString(
    length = 64,
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  ): string {
    return '';
  }
}
