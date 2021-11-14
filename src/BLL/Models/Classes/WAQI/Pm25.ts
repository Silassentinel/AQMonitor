// Imports
import IPm25 from "../../Interfaces/WAQI/IPm25";
/**
 * @class Pm25
 */
export default class Pm25 implements IPm25 {
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
