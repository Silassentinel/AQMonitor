//#region Imports
import ICo from '../../Models/Interfaces/WAQI/ICo';
//#endregion
/**
 * Carbon Monoxide repo
 */
export default interface ICORepo {
  //#region Crud Methods
  /**
   * Get all CO
   * @returns {Promise<ICo[]>}
   */
  getAll(): Promise<ICo[]>;
  /**
   * Get by Id
   * @param {string} id
   * @returns {Promise<ICo>}
   */
  getById(id: string): Promise<ICo>;
  /**
   * Get by value
   * @param {number} value
   * @returns {Promise<ICo>}
   */
  getByValue(value: number): Promise<ICo>;
  /**
   * Add new CO
   * @param {ICo} co
   */
  add(co: ICo): Promise<void>;
  /**
   * Update CO
   * @param {ICo} co
   */
  update(co: ICo): Promise<void>;
  /**
   * Delete CO by ID
   * @param {string} id
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if CO exists by Id
   * @param {string} id
   */
  exists(id: string): Promise<boolean>;
  /**
   * Checks if CO exists by value
   */
  exists(value: number): Promise<boolean>;
  //#endregion
}
