//#region imports
import IO3 from '../../Models/Interfaces/WAQI/IO3';
//#endregion
/**
 * Interface for IO3Repo
 */
export default interface IO3Repo {
  //#region CRUD methods
  /**
   * Get all IO3s
   */
  getAll(): Promise<IO3[]>;
  /**
   * Get IO3 by id.
   * @param id number
   */
  getById(id: string): Promise<IO3>;
  /**
   * Add IO3.
   * @param IO3 IO3
   */
  add(IO3: IO3): Promise<void>;
  /**
   * Update IO3.
   * @param IO3 IO3
   */
  update(IO3: IO3): Promise<void>;
  /**
   * Delete IO3 by id.
   * @param id number
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if IO3 exists.
   * @param id number
   */
  Exist(id: string): Promise<boolean>;
  //#endregion
}
