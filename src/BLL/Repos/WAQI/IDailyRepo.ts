//#region imports
import IDaily from '../../Models/Interfaces/WAQI/IDaily';
//#endregion
/**
 * Interface for the daily repo.
 */
export default interface IDailyRepo {
  //#region CRUD Methods
  /**
   * Gets the Daily obj by ID.
   * @param id The ID of the Daily obj.
   */
  getById(id: number): Promise<IDaily>;
  /**
   * Get All Daily objs.
   */
  getAll(): Promise<IDaily[]>;
  /**
   * Adds a Daily obj.
   * @param daily The Daily obj to add.
   */
  add(daily: IDaily): Promise<void>;
  /**
   * Updates a Daily obj.
   * @param daily The Daily obj to update.
   */
  update(daily: IDaily): Promise<void>;
  /**
   * Deletes a Daily obj by ID.
   * @param id The ID of the Daily obj to delete.
   */
  delete(id: number): Promise<void>;
  /**
   * Checks if a Daily obj exists.
   * @param id The ID of the Daily obj to check.
   */
  exists(id: number): Promise<boolean>;
  //#endregion
}
