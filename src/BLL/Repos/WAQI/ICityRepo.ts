//# region Imports
import ICity from '../../Models/Interfaces/WAQI/ICity';
//#endregion
/**
 * Interface for City Repo
 */
export default interface ICityRepo {
  //#region CURD Methods
  /**
   * Get all cities
   */
  getAll(): Promise<ICity[]>;
  /**
   * Get city by id
   * @param id City id
   */
  getById(id: string): Promise<ICity>;
  /**
   * Get city by name
   * @param name City name
   */
  getByName(name: string): Promise<ICity>;
  /**
   * Get city by geo coordinates
   * @param geo {number} coordinates
   */
  getByGeo(geo: number[]): Promise<ICity>;
  /**
   * Get city by Url
   * @param url City url
   */
  getByUrl(url: string): Promise<ICity>;
  /**
   * Add new city
   * @param city City to add
   */
  add(city: ICity): Promise<ICity>;
  /**
   * Update city
   * @param city City to update
   */
  update(city: ICity): Promise<ICity>;
  /**
   * Delete city
   * @param id City id
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if city exists by Id.
   * @param id City id
   */
  exists(id: string): Promise<boolean>;
  /**
   * Checks if city exists by Name.
   * @param name City name
   */
  existsByName(name: string): Promise<boolean>;
  /**
   * Checks if city exists by Geo.
   * @param geo {number} coordinates
   */
  existsByGeo(geo: number[]): Promise<boolean>;
  /**
   * Checks if city exists by Url.
   * @param url City url
   */
  existsByUrl(url: string): Promise<boolean>;
  //#endregion
}
