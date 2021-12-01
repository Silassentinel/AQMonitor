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
  getAllIO3s(): Promise<IO3[]>;
  /**
   * Get IO3 by id.
   * @param id number
   */
  getIO3ById(id: number): Promise<IO3>;
  /**
   * Add IO3.
   * @param IO3 IO3
   */
  addIO3(IO3: IO3): Promise<void>;
  /**
   * Update IO3.
   * @param IO3 IO3
   */
  updateIO3(IO3: IO3): Promise<void>;
  /**
   * Delete IO3 by id.
   * @param id number
   */
  deleteIO3(id: number): Promise<void>;
  /**
   * Checks if IO3 exists.
   * @param id number
   */
  Exist(id: number): Promise<boolean>;
  //#endregion
}
