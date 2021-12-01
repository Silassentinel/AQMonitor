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
  getById(id: string): Promise<IForecast>;
  /**
   * Get All
   */
  getAll(): Promise<IForecast[]>;
  /**
   * Adds a new forecast.
   * @param forecast The forecast to add.
   */
  add(forecast: IForecast): Promise<void>;
  /**
   * Updates the forecast with the given id.
   * @param forecast {IForecast} The forecast to update.
   */
  update(forecast: IForecast): Promise<void>;
  /**
   * Deletes the forecast with the given id.
   * @param id The id of the forecast.
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if a forecast with the given id exists.
   * @param id The id of the forecast.
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
