// Imports
import ICity from '../../Interfaces/WAQI/ICity';
import CityException from '../../../Utils/Exceptions/Model/CityException';
/**
 * City class
 */
export default class City implements ICity {
  // #region Props
  id!: string;
  geo!: number[];
  name!: string;
  url!: string;
  // #endregion
  // #region Ctor
  constructor(geo: number[], name: string, url: string) {
    this.setGeo(geo);
    this.setName(name);
    this.setUrl(url);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new CityException(
        'City exception',
        'The city id is undefined or null or empty',
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
   * Sets the city's geo
   * @param geo {number[]} The city's geo
   */
  setGeo(geo: number[]): void {
    if (geo === undefined || geo === null || geo.length === 0) {
      throw new CityException(
        'City exception',
        'The city geo is undefined or null or empty',
        new Error(),
        geo
      );
    }
    this.geo = geo;
  }
  /**
   * Get the city's geo
   * @returns {number[]} The city's geo
   */
  getGeo(): number[] {
    return this.geo;
  }
  /**
   * Sets the city's name
   * @param name {string} The city's name
   */
  setName(name: string): void {
    if (name === undefined || name === null || name.length === 0) {
      throw new CityException(
        'City exception',
        'The city name is undefined or null or empty',
        new Error(),
        name
      );
    }
    this.name = name;
  }
  /**
   * Get the city's name
   * @returns {string} The city's name
   */
  getName(): string {
    return this.name;
  }
  /**
   * Sets the city's url
   * @param url {string} The city's url
   */
  setUrl(url: string): void {
    if (url === undefined || url === null || url.length === 0) {
      throw new CityException(
        'City exception',
        'The city url is undefined or null or empty',
        new Error(),
        url
      );
    }
    this.url = url;
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
