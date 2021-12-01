//#region imports
import IP from '../../Models/Interfaces/WAQI/IP';
//#endregion
/**
 * Interface for the IP Repo
 */
export default interface IPRepo {
  //#region CRUD methods
  /**
   * Gets all the IPs
   */
  getAll(): Promise<IP[]>;
  /**
   * Gets by Id
   * @param id The id of the IP
   */
  getById(id: string): Promise<IP>;
  /**
   * Get by Value
   * @param value The value of the IP
   */
  getByValue(value: number): Promise<IP>;
  /**
   * Adds a new IP
   * @param ip The IP to add
   */
  add(ip: IP): Promise<void>;
  /**
   * Updates an IP
   * @param ip The IP to update
   */
  update(ip: IP): Promise<void>;
  /**
   * Deletes an IP by Id.
   * @param id The id of the IP to delete
   */
  deleteById(id: string): Promise<void>;
  /**
   * checks if an IP exists by id
   * @param id The id of the IP
   */
  exists(id: string): Promise<boolean>;
  //#endregion
}
