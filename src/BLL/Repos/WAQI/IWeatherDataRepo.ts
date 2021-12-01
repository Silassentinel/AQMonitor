//#region imports
import IWeatherData from '../../Models/Interfaces/WAQI/IWeatherData';
//#endregion
/**
 * Interface for the weather data repository.
 */
export default interface IWeatherDataRepo {
  //#region CRUD methods
  /**
   * Get all
   */
  getAll(): Promise<IWeatherData[]>;
  /**
   * Get By id
   * @param id {string}
   */
  getById(id: string): Promise<IWeatherData>;
  /**
   * Get by City
   * @param city {string} Name of the city
   */
  GetByCity(city: string): Promise<IWeatherData>;
  /**
   * Add new weather data
   * @param data {IWeatherData}
   */
  add(data: IWeatherData): Promise<void>;
  /**
   * Update weather data
   * @param data {IWeatherData}
   */
  update(data: IWeatherData): Promise<void>;
  /**
   * Delete weather data by ID
   * @param id {string}
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if exits by Id
   * @param id {string}
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
