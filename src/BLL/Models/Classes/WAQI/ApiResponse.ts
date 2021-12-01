// imports
import IApiResponse from '../../Interfaces/WAQI/IApiResponse';
import IWeatherData from '../../Interfaces/WAQI/IWeatherData';
import ApiResponseException from '../../../Utils/Exceptions/Model/ApiResponseException';
/**
 * ApiResponse class
 */
export default class ApiResponse implements IApiResponse {
  // #region Props
  /**
   * Holds the status as string
   */
  status!: string;
  /**
   * Holds the data as IWeatherData
   */
  data!: IWeatherData;
  // #endregion
  // #region Ctor
  constructor(status: string, data: IWeatherData) {
    this.setStatus(status);
    this.setData(data);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the status
   * @param status {string} the status
   */
  setStatus(status: string): void {
    if (status === undefined || status === null) {
      throw new ApiResponseException(
        'WAQI - API Response Error',
        'status is required',
        new Error('status is required'),
        status
      );
    }
    this.status = status;
  }
  /**
   * Returns the status as string
   * @returns {string} status
   * @memberof ApiResponse
   * @method getStatus
   */
  getStatus(): string {
    return this.status;
  }
  setData(data: IWeatherData): void {
    if (data === undefined || data === null) {
      throw new ApiResponseException(
        'WAQI - API Response Error',
        'data is required',
        new Error('data is required'),
        data
      );
    }
    this.data = data;
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
