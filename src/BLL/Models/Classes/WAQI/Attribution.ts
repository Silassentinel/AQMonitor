// Imports
import IAttribution from '../../Interfaces/WAQI/IAttribution';
import AttributionException from '../../../Utils/Exceptions/Model/AttributionException';
/**
 * Attribution class
 */
export default class Attribution implements IAttribution {
  // #region Props
  id!: string;
  url!: string;
  name!: string;
  // #endregion
  // #region Ctor
  constructor(url: string, name: string) {
    this.setUrl(url);
    this.setName(name);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new AttributionException(
        'Attribution Exception',
        'The attribution id is undefined or empty',
        new Error(),
        id
      );
    }
    this.id = id;
  }
  /**
   * Gets the Id
   */
  getId(): string {
    return this.id;
  }
  /**
   * Sets the url of the attribution
   * @param {string} url The url of the attribution
   */
  setUrl(url: string): void {
    if (url === undefined || url === '') {
      throw new AttributionException(
        'Attribution Exception',
        'The attribution url is undefined or empty',
        new Error(),
        url
      );
    }
    this.url = url;
  }
  /**
   * Get the url of the attribution
   * @returns {string} The url of the attribution
   */
  getUrl(): string {
    return this.url;
  }
  /**
   * Sets the name of the attribution
   * @param name {string} The name of the attribution
   */
  setName(name: string): void {
    if (name === undefined) {
      throw new AttributionException(
        'Attribution Exception',
        'The attribution name is undefined or empty',
        new Error(),
        name
      );
    }
    this.name = name;
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
