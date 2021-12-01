//Imports
import IDebug from '../../Interfaces/WAQI/IDebug';
/**
 * Debug class
 */
export default class Debug implements IDebug {
  // #region Props
  id!: string;
  sync: string;
  // #endregion
  // #region Ctor
  constructor(sync: string) {
    this.sync = sync;
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new Error('DEBUG - Id is required');
    }
  }
  /**
   * Gets the Id
   */
  getId(): string {
    return this.id;
  }
  // #endregion
}
