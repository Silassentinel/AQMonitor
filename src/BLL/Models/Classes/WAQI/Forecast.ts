// Imports
import Daily from './Daily';
import ForecastException from '../../../Utils/Exceptions/Model/ForecastException';
/**
 * @class Forecast
 */
export default class IForecast {
  // #region Props
  id!: string;
  daily!: Daily;
  // #endregion
  // #region Ctor
  /**
   * CTOR
   * @param daily {Daily} The daily forecast
   */
  constructor(daily: Daily) {
    this.setDaily(daily);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new ForecastException(
        'Forecast exception',
        'The id is undefined or null',
        new Error(),
        id
      );
    }
    this.id = id;
  }
  /**
   * Gets the Id
   */
  getId(): string {
    return this.id;
  }
  /**
   * Sets the daily forecast
   * @param daily {Daily} The daily forecast
   */
  setDaily(daily: Daily): void {
    if (daily === undefined || daily === null) {
      throw new ForecastException(
        'Forecast exception',
        'The daily forecast is undefined or null',
        new Error(),
        daily
      );
    }
    this.daily = daily;
  }
  /**
   * Gets the daily forecast
   */
  getDaily(): Daily {
    return this.daily;
  }
  // #endregion
}
