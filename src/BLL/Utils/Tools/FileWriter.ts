import fs from 'fs';
import {stdout, stderr} from 'process';
import FileWriterException from '../Exceptions/Tools/FileWriterException';
import FilePathChecker from './FilePathChecker';

/**
 * @class FileWriter - Class to write files
 */
export default class FileWriter {
  // #region Helper Meths
  /**
   * Method to verify Array content
   * @param {string[]} array - Array of strings to write
   * @returns {boolean} - True if the array contains only valid strings
   */
  private static IsArrayOnlyStrings(array: string[]): boolean {
    let stringFlag = false;
    array.forEach((item: string) => {
      if (typeof item === 'string') {
        stringFlag = true;
      }
    });
    return stringFlag;
  }

  /**
   * Method to verify if the data variable
   * @param {string} data - Data to check
   * @returns {boolean} - True if the data is valid
   */
  private static IsDataValid(data: string | string[]): boolean {
    if (data.length === 0) {
      return false;
    }
    return true;
  }

  // #endregion
  // #region Meths
  /**
   * Write a file with the given content, creating the file if it does not exist else appending to it
   * @param {string} filePath - The path of the file to write including the file name + extension
   * @param {string} name - The name of the file to write
   * @param {string} data - The data to write
   */
  static WriteFileToDisk = (
    filePath: string,
    data: string[] | string
  ): void => {
    // check the filePath for malicious characters etc
    FilePathChecker.CheckFilePath(filePath);
    // check if any data is present and is valid
    if (!FileWriter.IsDataValid(data)) {
      throw new FileWriterException(
        'No data present - ',
        'if there is no data there is nothing to write',
        new Error('Cannot write to disk if no data is specified')
      );
    }
    // check if the data is an array
    if (Array.isArray(data)) {
      // check if the content of the array is only strings
      if (FileWriter.IsArrayOnlyStrings(data)) {
        // iterate through the array and write each item to the file
        data.forEach((item) => {
          try {
            // check if the file does not exist
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            fs.appendFileSync(`${filePath}`, `${item}`, 'utf8'); // eslint-disable-line
          } catch (err: unknown) {
            stderr.write((err as Error).message as string);
            throw new FileWriterException(
              'WriteToDiskError - ',
              'There was an error writing to disk \n',
              err as Error
            );
          }
        });
      }
    } else {
      // data is string
      try {
        // check if file does not exist
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs.appendFileSync(`${filePath}`, `${data}`, 'utf8'); // eslint-disable-line
        return;
      } catch (err: unknown) {
        stderr.write((err as Error).message as string);
        throw new FileWriterException(
          'WriteToDiskError - ',
          'There was an error writing to disk \n',
          err as Error
        );
      }
    }
  };

  /**
   * Write a file Async to disk, creating the file if it does not exist else appending to it
   * @param {string} filePath - The path of the file to write including the file name + extension
   * @param {string} name - The name of the file to write
   * @param {string} data - The data to write
   */
  static WriteFileToDiskAsync = async (
    filePath: string,
    data: string[] | string
  ): Promise<void> => {
    // check the filePath for malicious characters etc
    FilePathChecker.CheckFilePath(filePath);
    // check if any data is present and is valid
    if (!FileWriter.IsDataValid(data)) {
      throw new FileWriterException(
        'No data present - ',
        'if there is no data there is nothing to write',
        new Error('Cannot write to disk if no data is specified')
      );
    }
    // check if the data is an array
    if (Array.isArray(data)) {
      // iterate through the array and write each item to the file
      data.forEach((item) => {
        // add data to file if file does not exist create file wit data
        fs.appendFile(filePath, `${item}`, 'utf8', (err: unknown) => {
          // eslint-disable-line
          if (err) {
            stderr.write((err as Error).message as string);
            throw new FileWriterException(
              'WriteToDiskError - ',
              'There was an error writing to disk \n',
              err as Error
            );
          } else stdout.write('File written to disk \n');
        });
      });
    } else {
      // data is string
      fs.appendFile(filePath, data, 'utf-8', (err: unknown) => {
        // eslint-disable-line
        if (err) {
          stderr.write((err as Error).message as string);
          throw new FileWriterException(
            'WriteToDiskError - ',
            'There was an error writing to disk \n',
            err as Error
          );
        } else stdout.write('FILE WRITER REPORTS - File written to disk \n');
      });
    }
  };
  // #endregion
}
