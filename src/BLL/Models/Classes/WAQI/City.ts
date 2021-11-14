// Imports
import ICity from '../../Interfaces/WAQI/ICity';
/**
 * City class
 */
export default class City implements ICity {
  // #region Props
  geo: number[];
  name: string;
  url: string;
  // #endregion
  // #region Ctor
  constructor(geo: number[], name: string, url: string) {
    this.geo = geo;
    this.name = name;
    this.url = url;
  }
  // #endregion
  // #region Meths
  /**
   * Get the city's geo
   * @returns {number[]} The city's geo
   */
  getGeo(): number[] {
    return this.geo;
  }
  /**
   * Get the city's name
   * @returns {string} The city's name
   */
  getName(): string {
    return this.name;
  }
  /**
   * Get the city's url
   * @returns {string} The city's url
   */
  getUrl(): string {
    return this.url;
  }
  // #endregion
}
