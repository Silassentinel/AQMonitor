// Imports
import AttributionException from '../../../Utils/Exceptions/Model/AttributionException';
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
    if (url === undefined || url === '') {
      throw new AttributionException(
        'Attribution Exception',
        'The attribution url is undefined or empty',
        new Error(),
        url
      );
    }
    if (name === undefined) {
      throw new AttributionException(
        'Attribution Exception',
        'The attribution name is undefined or empty',
        new Error(),
        name
      );
    }
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
