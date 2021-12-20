//#region imports
import IIaqi from '../../Models/Interfaces/WAQI/IIaqi';
//#endregion
/**
 * Interface for the IAqiRepo
 */
export default interface IIaqiRepo {
  //#region CRUD methods
  /**
   * Get all IAqi.
   */
  getAll(): Promise<IIaqi[]>;
  /**
   * Get By Id.
   * @param id The id of the IAqi to get.
   */
  getById(id: string): Promise<IIaqi>;
  /**
   * Add a new IAqi.
   * @param IAqi The IAqi to add.
   */
  add(IAqi: IIaqi): Promise<void>;
  /**
   * Update an existing IAqi.
   * @param IAqi The IAqi to update.
   */
  update(IAqi: IIaqi): Promise<void>;
  /**
   * Delete an existing IAqi.
   * @param id The id of the IAqi to delete.
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if a IAqi with the given id exists.
   * @param id The id to check.
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
