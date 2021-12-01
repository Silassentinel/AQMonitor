//#region imports
import ISo2 from '../../Models/Interfaces/WAQI/ISo2';
//#endregion

/**
 * Interface ISO2Repo
 */
export default interface ISO2Repo {
  //#region CRUD methods
  /**
   * Gets all
   */
  getAll(): Promise<ISo2>;
  /**
   * Get by Id
   * @param id {string} id
   */
  getById(id: string): Promise<ISo2>;
  /**
   * Get by value
   * @param value {number} value
   */
  getByValue(value: number): Promise<ISo2>;
  /**
   * Add new SO2
   * @param so2 {ISo2} so2
   */
  add(so2: ISo2): Promise<ISo2>;
  /**
   * Update SO2
   * @param so2 {ISo2} so2
   */
  update(so2: ISo2): Promise<ISo2>;
  /**
   * Delete SO2
   * @param id {string} id
   */
  delete(id: string): Promise<ISo2>;
  /**
   * Checks if SO2 exists
   * @param id {string} id
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
