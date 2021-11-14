// Imports
import IUvi from "../../Interfaces/WAQI/IUvi";
/**
 * @class Uvi
 */
export default class Uvi implements IUvi {
  // #region Props
  avg: number;
  day: string;
  max: number;
  min: number;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} avg 
   * @param {string} day 
   * @param {number} max 
   * @param {number} min 
   */
  constructor(
    avg: number,
    day: string,
    max: number,
    min: number
  ) {
    this.avg = avg;
    this.day = day;
    this.max = max;
    this.min = min;
  }
  // #endregion
  // #region Meths
  // #endregion
}
