// Imports
import IAttribution from '../../Interfaces/WAQI/IAttribution';
/**
 * Attribution class
 */
export default class Attribution implements IAttribution {
  // #region Props
  url: string;
  name: string;
  // #endregion
  // #region Ctor
  constructor(url: string, name: string) {
    this.url = url;
    this.name = name;
  }
  // #endregion
  // #region Meths
  /**
   * Get the url of the attribution
   * @returns {string} The url of the attribution
   */
  getUrl(): string {
    return this.url;
  }
  /**
   * Get the name of the attribution
   * @returns {string} The name of the attribution
   */
  getName(): string {
    return this.name;
  }

  // #endregion
}
