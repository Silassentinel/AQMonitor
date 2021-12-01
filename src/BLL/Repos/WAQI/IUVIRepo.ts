//#region imports
import IUvi from '../../Models/Interfaces/WAQI/IUvi';
//#endregion

/**
 * Interface for the IUVIRepo
 */
export default interface IUVIRepo {
  //#region CRUD methods
  /**
   * Get All
   */
  getAll(): Promise<IUvi[]>;
  /**
   * Get by Id
   * @param id {string}
   */
  getById(id: string): Promise<IUvi>;
  /**
   * Add new Uvi
   * @param uvi {IUvi}
   */
  add(uvi: IUvi): Promise<void>;
  /**
   * Update Uvi
   * @param uvi {IUvi}
   */
  update(uvi: IUvi): Promise<void>;
  /**
   * Delete Uvi
   * @param id {string}
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if the UVI exists by id
   * @param id {string}
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
