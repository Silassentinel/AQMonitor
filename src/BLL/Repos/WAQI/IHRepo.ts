//#region imports
import IH from '../../Models/Interfaces/WAQI/IH';
//#endregion
/**
 * Interface for the IHRepo
 */
export default interface IHRepo {
  //#region CRUD methods
  /**
   * Gets the IH by its id.
   * @param id The id of the IH to get.
   */
  get(id: string): Promise<IH>;
  /**
   * Get By value.
   * @param value {number} value to search.
   */
  getByValue(value: number): Promise<IH>;
  /**
   * Get All
   */
  getAll(): Promise<IH[]>;
  /**
   * Adds a new IH to the database.
   * @param IH The IH to add.
   */
  add(IH: IH): Promise<void>;
  /**
   * Updates an IH in the database.
   * @param IH The IH to update
   */
  update(IH: IH): Promise<void>;
  /**
   * Removes an IH from the database by id.
   * @param id The id of the IH to remove.
   */
  remove(id: string): Promise<void>;
  /**
   * Checks if an IH exists in the database.
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
