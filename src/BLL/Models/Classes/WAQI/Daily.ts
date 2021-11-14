// Imports
import IDaily from '../../Interfaces/WAQI/IDaily';
import O3 from './O3';
import Pm10 from './Pm10';
import Pm25 from './Pm25';
import Uvi from './Uvi';
/**
 * Daily class
 */
export default class Daily implements IDaily {
  // #region Props
  o3: O3[];
  pm10: Pm10[];
  pm25: Pm25[];
  uvi: Uvi[];
  // #endregion
  // #region Ctor
  constructor(o3: O3[], pm10: Pm10[], pm25: Pm25[], uvi: Uvi[]) {
    this.o3 = o3;
    this.pm10 = pm10;
    this.pm25 = pm25;
    this.uvi = uvi;
  }
  // #endregion
  // #region Meths
  // #endregion
}
