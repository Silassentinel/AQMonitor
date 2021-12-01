//#region imports
import IW from '../../Models/Interfaces/WAQI/IW';
//#endregion
/**
 * Interface for the IWRepo
 */
export default interface IWRepo {
  //#region CRUD methods
  /**
   * Get All
   */
  getAll(): Promise<IW[]>;
  /**
   * Get by Id
   * @param id {string}
   */
  getById(id: string): Promise<IW>;
  /**
   * Get By value
   * @param value {number}
   */
  getByValue(value: number): Promise<IW>;
  /**
   * Add new W
   * @param w {IW}
   */
  add(w: IW): Promise<void>;
  /**
   * Update W
   * @param w {IW}
   */
  update(w: IW): Promise<void>;
  /**
   * Delete W by id
   * @param id {string}
   */
  delete(id: string): Promise<void>;
  /**
   * Check if exists by ID
   * @param id {string}
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
