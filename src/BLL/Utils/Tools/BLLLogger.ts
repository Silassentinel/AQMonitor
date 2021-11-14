import 'dotenv/config';
import BLLLoggerException from '../Exceptions/Tools/BLLLoggerException';
import FileWriter from './FileWriter';
/**
 * Business Logics Layer Logger
 * creates logfiles for each error, warning, info and event
 */
export default class BLLLogger {
  // #region Props
  /**
   * Path to the verbose logfile
   * extracted from .env file
   */
  private static _verboseLogPath = `${process.env.VERBOSELOGPATH}`;

  /**
   * Path to the error logfile
   * extracted from .env file
   */
  private static _errorLogPath = `${process.env.ERRORLOGPATH}`;

  /**
   * Path to the warning logfile
   * extracted from .env file
   */
  private static _warningLogPath = `${process.env.WARNINGLOGPATH}`;

  /**
   * Path to the info logfile
   * extracted from .env file
   */
  private static _infoLogPath = `${process.env.INFOLOGPATH}`;

  /**
   * Path to the event logfile
   * extracted from .env file
   */
  private static _eventLogPath = `${process.env.EVENTLOGPATH}`;

  /**
   * Timestamp when the logger was created
   */
  private static _logCreated = `${new Date().toLocaleDateString(
    'nl-Be'
  )} ${new Date().toLocaleTimeString('nl-Be')}`;

  // #endregion

  // #region Ctor
  // ALL STATIC NO CTORS
  // #endregion

  // #region Meths
  // #region Verbose
  /**
   * Method to write verbose messages to the logfile
   * @param {string} message - the message to write
   */
  public static Verbose(name: string, linesToLogg: string[] | string): void {
    try {
      FileWriter.WriteFileToDisk(
        this._verboseLogPath,
        `${name} - ${this._logCreated} - \n` + `${linesToLogg}`
      );
    } catch (error) {
      throw new BLLLoggerException(
        'BLLLogger - VERBOSE',
        'Something went wrong while writing VERBOSE',
        error as Error
      );
    }
  }

  /**
   * Method to write verbose messages to the logfile
   * @param {string} message - the message to write
   * @param {string} linesToLog - the lines to log
   */
  public static async VerboseAsync(
    name: string,
    linesToLogg: string[] | string
  ): Promise<void> {
    await FileWriter.WriteFileToDiskAsync(
      this._verboseLogPath,
      name + linesToLogg
    ).catch((error: unknown) => {
      throw new BLLLoggerException(
        'BLLLogger - VERBOSEAsync',
        'Something went wrong while writing VERBOSE',
        error as Error
      );
    });
  }

  // #endregion

  // #region Error
  /**
   * Method to write error messages to the logfile
   * @param {string} message - the message to write
   * @param {string} linesToLog - the lines to log
   */
  public static Error(name: string, linesToLog: string[] | string): void {
    try {
      FileWriter.WriteFileToDisk(
        this._errorLogPath,
        `${name} - ${this._logCreated} - \n` + `${linesToLog}`
      );
    } catch (error) {
      throw new BLLLoggerException(
        'BLLLogger - ERROR',
        'Something went wrong while writing ERROR',
        error as Error
      );
    }
  }

  /**
   * ErrorAsync
   * @param name - name of the log
   * @param linesToLog - lines to log
   */
  public static async ErrorAsync(
    name: string,
    linesToLog: string[] | string
  ): Promise<void> {
    await FileWriter.WriteFileToDiskAsync(
      this._errorLogPath,
      name + linesToLog
    ).catch((error: unknown) => {
      throw new BLLLoggerException(
        'BLLLogger - ERRORAsync',
        'Something went wrong while writing ERROR',
        error as Error
      );
    });
  }
  // #endregion

  // #region Warning
  /**
   * Method to write warning messages to the logfile
   * @param {string} message - the message to write
   */
  public static Warning(name: string, linesToLog: string[] | string): void {
    try {
      FileWriter.WriteFileToDisk(
        this._warningLogPath,
        `${name} - ${this._logCreated} - \n` + `${linesToLog}`
      );
    } catch (error) {
      throw new BLLLoggerException(
        'BLLLogger - WARNING',
        'Something went wrong while writing WARNING',
        error as Error
      );
    }
  }

  /**
   * WarningAsync
   * @param name - name of the log
   * @param linesToLog - lines to log
   */
  public static async WarningAsync(
    name: string,
    linesToLog: string[] | string
  ): Promise<void> {
    await FileWriter.WriteFileToDiskAsync(
      this._infoLogPath,
      name + linesToLog
    ).catch((error: unknown) => {
      throw new BLLLoggerException(
        'BLLLogger - INFOAsync',
        'Something went wrong while writing INFO',
        error as Error
      );
    });
  }
  // #endregion

  // #region Info
  /**
   * Method to write info messages to the logfile
   * @param {string} message - the message to write
   */
  public static Info(name: string, linesToLog: string[] | string): void {
    try {
      FileWriter.WriteFileToDisk(
        this._infoLogPath,
        `${name} - ${this._logCreated} - \n` + `${linesToLog}`
      );
    } catch (error) {
      throw new BLLLoggerException(
        'BLLLogger - INFO',
        'Something went wrong while writing INFO',
        error as Error
      );
    }
  }

  /**
   * InfoAsync
   * @param name - name of the log
   * @param linesToLog - lines to log
   * @returns {Promise<void>}
   */
  public static async InfoAsync(
    name: string,
    linesToLog: string[] | string
  ): Promise<void> {
    await FileWriter.WriteFileToDiskAsync(
      this._infoLogPath,
      name + linesToLog
    ).catch((error: unknown) => {
      throw new BLLLoggerException(
        'BLLLogger - INFOAsync',
        'Something went wrong while writing INFO',
        error as Error
      );
    });
  }

  // #endregion
  // #region Event
  /**
   * Method to write event messages to the logfile
   * @param {string} message - the message to write
   */
  public static Event(name: string, linesToLog: string[] | string): void {
    try {
      FileWriter.WriteFileToDisk(
        this._eventLogPath,
        `${name} - ${this._logCreated} - \n` + `${linesToLog}`
      );
    } catch (error) {
      throw new BLLLoggerException(
        'BLLLogger - EVENT',
        'Something went wrong while writing EVENT',
        error as Error
      );
    }
  }

  /**
   * EventAsync
   * @param name - name of the log
   * @param linesToLog - lines to log
   * @returns {Promise<void>}
   */
  public static async EventAsync(
    name: string,
    linesToLog: string[] | string
  ): Promise<void> {
    await FileWriter.WriteFileToDiskAsync(
      this._eventLogPath,
      name + linesToLog
    ).catch((error: unknown) => {
      throw new BLLLoggerException(
        'BLLLogger - EVENTAsync',
        'Something went wrong while writing EVENT',
        error as Error
      );
    });
  }
  // #endregion
  // #endregion
}
