// Imports
import IO3 from '../../Interfaces/WAQI/IO3';
import O3Exception from '../../../Utils/Exceptions/Model/O3Exception';
/**
 * @class O3
 */
export default class O3 implements IO3 {
  // #region Props
  id!: string;
  value!: number;
  avg!: number;
  day!: string;
  max!: number;
  min!: number;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} value
   * @param {number} avg
   * @param {string} day
   * @param {number} max
   * @param {number} min
   */
  constructor(v: number, avg: number, day: string, max: number, min: number) {
    this.setValue(v);
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
      throw new O3Exception(
        'O3 Exception',
        'Id must be a string',
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
   * Sets the Ozon value
   * @param v {number} Value of Ozone
   */
  setValue(v: number): void {
    if (v === undefined || v < 0) {
      throw new O3Exception(
        'O3 Exception',
        'Value must be a positive number',
        new Error(),
        v
      );
    }
    this.value = v;
  }
  /**
   * Gets the Ozone value
   */
  getValue(): number {
    return this.value;
  }
  /**
   * Sets the Ozone average value
   * @param avg {number} Average value of Ozone
   */
  setAvg(avg: number): void {
    if (avg === undefined || avg < 0) {
      throw new O3Exception(
        'O3 Exception',
        'Average value must be a positive number',
        new Error(),
        avg
      );
    }
    this.avg = avg;
  }
  /**
   * Gets the Ozone average value
   */
  getAvg(): number {
    return this.avg;
  }
  /**
   * Sets the day
   * @param day {string} Day of the week
   */
  setDay(day: string): void {
    if (day === undefined || day === '') {
      throw new O3Exception(
        'O3 Exception',
        'Day must be a string',
        new Error(),
        day
      );
    }
    this.day = day;
  }
  /**
   * Gets the day of the week
   */
  getDay(): string {
    return this.day;
  }
  /**
   * Sets the Ozone max value
   * @param max {number} Maximum value of Ozone
   */
  setMax(max: number): void {
    if (max === undefined || max < 0) {
      throw new O3Exception(
        'O3 Exception',
        'Maximum value must be a positive number',
        new Error(),
        max
      );
    }
    this.max = max;
  }
  /**
   * Gets the Ozone max value
   */
  getMax(): number {
    return this.max;
  }
  /**
   * Sets the Ozone min value
   * @param min {number} Minimum value of Ozone
   */
  setMin(min: number): void {
    if (min === undefined || min < 0) {
      throw new O3Exception(
        'O3 Exception',
        'Minimum value must be a positive number',
        new Error(),
        min
      );
    }
    this.min = min;
  }
  /**
   * Gets the Ozone min value
   */
  getMin(): number {
    return this.min;
  }
  // #endregion
}
