// Imports
import UVIException from '../../../Utils/Exceptions/Model/UVIException';
import IUvi from '../../Interfaces/WAQI/IUvi';
/**
 * @class Uvi
 */
export default class Uvi implements IUvi {
  // #region Props
  id!: string;
  avg!: number;
  day!: string;
  max!: number;
  min!: number;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} avg
   * @param {string} day
   * @param {number} max
   * @param {number} min
   */
  constructor(avg: number, day: string, max: number, min: number) {
    this.setAvg(avg);
    this.setDay(day);
    this.setMax(max);
    this.setMin(min);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new UVIException(
        'UVI Exception',
        'UVI cannot be undeff or empty',
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
   * Sets the average ultraviolet index
   * @param avg {number} Average Ultraviolet Index
   */
  setAvg(avg: number): void {
    if (avg === undefined || avg < 0) {
      throw new UVIException(
        'UVI Exception',
        'UVI cannot be undeff or less than 0',
        new Error(),
        avg
      );
    }
    this.avg = avg;
  }
  /**
   * Gets the average ultraviolet index
   */
  getAvg(): number {
    return this.avg;
  }
  /**
   * Sets the day
   * @param day {string} Day of the week
   */
  setDay(day: string): void {
    if (day === undefined || day.trim() === '') {
      throw new UVIException(
        'UVI Exception',
        'UVI cannot be undeff or empty',
        new Error(),
        day
      );
    }
    this.day = day;
  }
  /**
   * Gets the day
   */
  getDay(): string {
    return this.day;
  }
  /**
   * Sets the maximum ultraviolet index
   * @param max {number} Maximum Ultraviolet Index
   */
  setMax(max: number): void {
    if (max === undefined || max < 0) {
      throw new UVIException(
        'UVI Exception',
        'UVI cannot be undeff or less than 0',
        new Error(),
        max
      );
    }
    this.max = max;
  }
  /**
   * Gets the maximum ultraviolet index
   */
  getMax(): number {
    return this.max;
  }
  /**
   * Sets the minimum ultraviolet index
   * @param min {number} Minimum Ultraviolet Index
   */
  setMin(min: number): void {
    if (min === undefined || min < 0) {
      throw new UVIException(
        'UVI Exception',
        'UVI cannot be undeff or less than 0',
        new Error(),
        min
      );
    }
    this.min = min;
    ('');
  }
  /**
   * Gets the minimum ultraviolet index
   */
  getMin(): number {
    return this.min;
  }
  // #endregion
}
