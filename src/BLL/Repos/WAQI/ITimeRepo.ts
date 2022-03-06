//#region imports
import ITime from '../../Models/Interfaces/WAQI/ITime';
//#endregion
/**
 * Interface for the ITimeRepo
 */
export default interface ITimeRepo {
  //#region CRUD methods
  /**
   * Get all Times from the database.
   */
  getAll(): Promise<ITime[]>;
  /**
   * Get by Id.
   * @param id {string} Id of the time to get.
   */
  getById(id: string): Promise<ITime>;
  /**
   * Get by value.
   * @param value {number} Value of the time to get.
   */
  getByValue(value: number): Promise<ITime>;
  /**
   * Get all by TimeZone
   * @param timeZone {string} TimeZone of the time to get.
   */
  getByTimeZone(timeZone: string): Promise<ITime[]>;
  /**
   * Add a new Time to the database.
   * @param time {ITime} Time to add.
   */
  add(time: ITime): Promise<void>;
  /**
   * Update an existing Time in the database.
   * @param time {ITime} Time to update.
   */
  update(time: ITime): Promise<void>;
  /**
   * Delete an existing Time from the database.
   * @param id {string} Id of the time to delete.
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if a Time with the given Id exists in the database.
   * @param id {string} Id of the time to check.
   */
  exists(id: string): Promise<boolean>;
  /**
   * Checks if a Time with the given value exists in the database.
   * @param value {number} Value of the time to check.
   */
  existsByValue(value: number): Promise<boolean>;
  //#endregion
}
