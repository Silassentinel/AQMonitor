//#region imports
import INo2 from '../../Models/Interfaces/WAQI/INo2';
//#endregion
/**
 * Interface for INO2Repo
 */
export default interface INO2Repo {
  //#region CRUD methods
  /**
   * Get by Id
   * @param id identifier of the entity
   */
  getById(id: string): Promise<INo2>;
  /**
   * Get By Value
   * @param value value
   */
  getByValue(value: number): Promise<INo2>;
  /**
   * Get all
   */
  getAll(): Promise<INo2[]>;
  /**
   * Add new NO2
   * @param NO2 to add
   */
  add(NO2: INo2): Promise<void>;
  /**
   * Update NO2
   * @param NO2 to update
   */
  update(NO2: INo2): Promise<void>;
  /**
   * Delete NO2
   * @param id of the NO2 to delete
   */
  delete(id: string): Promise<void>;
  /**
   * Check if NO2 exists by Id.
   * @param id identifier of the entity
   */
  exists(id: string): Promise<boolean>;
  /**
   * Check if NO2 exists by Value.
   * @param value value
   */
  existsByValue(value: number): Promise<boolean>;
  //#endregion
}
