// Imports
import IO3 from '../../Interfaces/WAQI/IO3';
/**
 * @class O3
 */
export default class O3 implements IO3 {
  // #region Props
  v: number;
  avg: number;
  day: string;
  max: number;
  min: number;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} v
   * @param {number} avg
   * @param {string} day
   * @param {number} max
   * @param {number} min
   */
  constructor(v: number, avg: number, day: string, max: number, min: number) {
    this.v = v;
    this.avg = avg;
    this.day = day;
    this.max = max;
    this.min = min;
  }
  // #endregion
  // #region Meths
  // #endregion
}
