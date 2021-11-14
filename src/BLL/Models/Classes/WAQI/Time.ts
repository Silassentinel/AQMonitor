// Imports
import ITime from '../../Interfaces/WAQI/ITime';
/**
 * @class Time
 */
export default class Time implements ITime {
  // #region Props
  s: string;
  tz: string;
  v: number;
  iso: string;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {string} s 
   * @param {string} tz 
   * @param {number} v 
   * @param {string} iso 
   */
  constructor(s: string, tz: string, v: number, iso: string) {
    this.s = s;
    this.tz = tz;
    this.v = v;
    this.iso = iso;
  }
  // #endregion
  // #region Meths
  // #endregion
}
