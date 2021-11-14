// Imports
import IPm10 from '../../Interfaces/WAQI/IPm10';
/**
 * @class Pm10
 */
export default class Pm10 implements IPm10 {
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
