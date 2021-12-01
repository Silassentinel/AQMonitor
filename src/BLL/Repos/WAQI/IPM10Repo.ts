//#region imports
import IPm10 from '../../Models/Interfaces/WAQI/IPm10';
//#endregion
/**
 * Interface IPM10Repo
 */
export default interface IPM10Repo {
  //#region CRUD methods
  /**
   * Gets all
   */
  getAll(): Promise<IPm10[]>;
  /**
   * Get By Id
   */
  getById(id: string): Promise<IPm10>;
  /**
   * Add new PM10
   * @param pm10 to add
   */
  add(pm10: IPm10): Promise<void>;
  /**
   * Update existing PM10
   * @param pm10 - PM10 to be updated
   */
  update(pm10: IPm10): Promise<void>;
  /**
   * Delete PM10
   * @param id - Id of the PM10 to be deleted
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if PM10 exists
   */
  exists(id: number): Promise<boolean>;
  //#endregion
}
