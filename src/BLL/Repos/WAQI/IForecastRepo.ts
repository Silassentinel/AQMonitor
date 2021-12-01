//#region imports
import IForecast from '../../Models/Interfaces/WAQI/IForecast';
//#endregion
/**
 * Interface for the forecast repo.
 */
export default interface IForecastRepo {
  //#region CRUD Methods
  /**
   * Gets the forecast by the given id.
   * @param id The id of the forecast.
   */
  getForecastById(id: number): Promise<IForecast>;
  /**
   * Get All
   */
  getAll(): Promise<IForecast[]>;
  /**
   * Adds a new forecast.
   * @param forecast The forecast to add.
   */
  addForecast(forecast: IForecast): Promise<void>;
  /**
   * Updates the forecast with the given id.
   * @param forecast {IForecast} The forecast to update.
   */
  updateForecast(forecast: IForecast): Promise<void>;
  /**
   * Deletes the forecast with the given id.
   * @param id The id of the forecast.
   */
  deleteForecast(id: number): Promise<void>;
  //#endregion
}
