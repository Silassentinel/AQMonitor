import FilePathCheckerException from '../Exceptions/Tools/FilePathCheckerException';

/**
 * File path checker.
 */
export default class FilePathChecker {
  /**
   * Method will check filePath var for malicious code and throw exception if any are found
   */
  static CheckFilePath(filePath: string): void {
    if (filePath.includes('..') || filePath.includes('\\')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('~')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    // if (filePath.includes('/')) {
    //   throw new FilePathCheckerException(
    //     'Invalid File Path - ',
    //     'File path contains invalid characters',
    //     new Error('Invalid chars were in filePath'),
    //   );
    // }
    if (filePath.includes("'")) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('"')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('`')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('$')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('!')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('@')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('#')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('%')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('^')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('&')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('*')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('(')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes(')')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('[')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes(']')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('{')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('}')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.includes('|')) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path contains invalid characters',
        new Error('Invalid chars were in filePath')
      );
    }
    if (filePath.length > 255) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path is too long',
        new Error('File path is too long')
      );
    }
    if (filePath.length === 0) {
      throw new FilePathCheckerException(
        'Invalid File Path - ',
        'File path is too short',
        new Error('File path is too short')
      );
    }
  }
}
