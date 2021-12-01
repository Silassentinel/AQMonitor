//#region imports
import IPm25 from '../../Models/Interfaces/WAQI/IPm25';
//#endregion
/**
 * Interface for the IPM25Repo
 */
export default interface IPM25Repo {
  //#region CRUD methods
  /**
   * Gets all
   */
  getAll(): Promise<IPm25[]>;
  /**
   * Get By Id
   */
  getById(id: string): Promise<IPm25>;
  /**
   * Add new IPm25
   * @param IPm25 to add
   */
  add(IPm25: IPm25): Promise<void>;
  /**
   * Update existing IPm25
   * @param IPm25 - IPm25 to be updated
   */
  update(IPm25: IPm25): Promise<void>;
  /**
   * Delete IPm25
   * @param id - Id of the IPm25 to be deleted
   */
  delete(id: string): Promise<void>;
  /**
   * Checks if IPm25 exists
   */
  exists(id: number): Promise<boolean>;
  //#endregion
}
