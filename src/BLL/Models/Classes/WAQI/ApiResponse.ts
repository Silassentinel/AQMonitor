// imports
import IApiResponse from '../../Interfaces/WAQI/IApiResponse';
import IWeatherData from '../../Interfaces/WAQI/IWeatherData';
/**
 * ApiResponse class
 */
export default class ApiResponse implements IApiResponse {
  // #region Props
  /**
   * Holds the status as string
   */
  status: string;
  /**
   * Holds the data as IWeatherData
   */
  data: IWeatherData;
  // #endregion
  // #region Ctor
  constructor(status: string, data: IWeatherData) {
    this.status = status;
    this.data = data;
  }
  // #endregion
  // #region Meths
  /**
   * Returns the status as string
   * @returns {string} status
   * @memberof ApiResponse
   * @method getStatus
   */
  getStatus(): string {
    return this.status;
  }
  /**
   * Returns the data as IWeatherData
   * @returns {IWeatherData} data
   * @memberof ApiResponse
   * @method getData
   */
  getData(): IWeatherData {
    return this.data;
  }
  // #endregion
}
