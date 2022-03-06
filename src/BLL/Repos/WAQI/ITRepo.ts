//#region imports
import IT from '../../Models/Interfaces/WAQI/IT';
//#endregion
/**
 * Interface for IT Repo
 */
export default interface ITRepo {
  //#region CRUD methods
  /**
   * Get all ITs
   */
  getAll(): Promise<IT[]>;
  /**
   * Get one IT by id
   * @param id {string} IT id
   */
  getById(id: string): Promise<IT>;
  /**
   * Add new IT
   * @param IT {IT} IT to add
   */
  add(IT: IT): Promise<void>;
  /**
   * Update IT
   * @param IT {IT} IT to update
   */
  update(IT: IT): Promise<void>;
  /**
   * Delete IT
   * @param id {string} IT id
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if IT exists
   * @param id {string} IT id
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
