//# region Imports
import IAttribution from '../../Models/Interfaces/WAQI/IAttribution';
//# endregion
/**
 * Interface for the attribution repository.
 */
export default interface IAttributionRepo {
  //# region CRUD Methods
  /**
   * Gets the attribution by id.
   * @param id The id of the attribution.
   * @returns The attribution.
   * @throws Throws an error if the attribution does not exist.
   */
  getById(id: number): Promise<IAttribution>;
  /**
   * Gets the attribution by name.
   */
  getByName(name: string): Promise<IAttribution>;
  /**
   * Gets all attributions.
   */
  getAll(): Promise<IAttribution[]>;
  /**
   * Get Attribution by URL
   */
  getByUrl(url: string): Promise<IAttribution>;
  /**
   * Adds a new attribution.
   * @param attribution The attribution to add.
   */
  add(attribution: IAttribution): Promise<void>;
  /**
   * Updates an attribution.
   * @param attribution The attribution to update.
   */
  update(attribution: IAttribution): Promise<void>;
  /**
   * Deletes an attribution.
   * @param id The id of the attribution to delete.
   */
  delete(id: number): Promise<void>;
  /**
   * Checks if an attribution exists by Id.
   */
  exists(id: number): Promise<boolean>;
  /**
   * Checks if an attribution exists by name.
   */
  existsByName(name: string): Promise<boolean>;
  /**
   * Checks if an attribution exists by URL.
   */
  existsByUrl(url: string): Promise<boolean>;
  //# endregion
}
