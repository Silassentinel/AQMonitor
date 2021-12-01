// Imports
import IPm25 from '../../Interfaces/WAQI/IPm25';
import PM25Exception from '../../../Utils/Exceptions/Model/PM25Exception';
/**
 * @class Pm25
 */
export default class Pm25 implements IPm25 {
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
   * @param {number} v
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
      throw new PM25Exception(
        'PM10 Exception',
        'The id must be a string',
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
   * Sets the value of the Particulate Matter
   * @param v {number} The value of the Particulate Matter (PM)
   */
  setValue(v: number): void {
    if (v === undefined || v < 0) {
      throw new PM25Exception(
        'PM10 Exception',
        'The value of the Particulate Matter (PM) must be a positive number',
        new Error(),
        v
      );
    }
    this.value = v;
  }
  /**
   * Gets the value of the Particulate Matter
   * @returns {number} The value of the Particulate Matter (PM)
   */
  getValue(): number {
    return this.value;
  }
  /**
   * Sets the average value of the Particulate Matter
   * @param avg {number} The average value of the Particulate Matter (PM)
   */
  setAvg(avg: number): void {
    if (avg === undefined || avg < 0) {
      throw new PM25Exception(
        'PM10 Exception',
        'The average value of the Particulate Matter (PM) must be a positive number',
        new Error(),
        avg
      );
    }
    this.avg = avg;
  }
  /**
   * Gets the average value of the Particulate Matter
   */
  getAvg(): number {
    return this.avg;
  }
  /**
   * Sets the day of the week
   * @param day {string} Day of the week
   */
  setDay(day: string): void {
    if (day === undefined || day === '') {
      throw new PM25Exception(
        'PM10 Exception',
        'The day of the week must be a string',
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
   * Sets the maximum value of the Particulate Matter
   * @param max {number} Maximum value of the Particulate Matter (PM)
   */
  setMax(max: number): void {
    if (max === undefined || max < 0) {
      throw new PM25Exception(
        'PM10 Exception',
        'The maximum value of the Particulate Matter (PM) must be a positive number',
        new Error(),
        max
      );
    }
    this.max = max;
  }
  /**
   * Gets the maximum value of the Particulate Matter
   */
  getMax(): number {
    return this.max;
  }
  /**
   * Sets the minimum value of the Particulate Matter
   * @param min {number} Minimum value of the Particulate Matter (PM)
   */
  setMin(min: number): void {
    if (min === undefined || min < 0) {
      throw new PM25Exception(
        'PM10 Exception',
        'The minimum value of the Particulate Matter (PM) must be a positive number',
        new Error(),
        min
      );
    }
    this.min = min;
  }
  /**
   * Gets the minimum value of the Particulate Matter
   */
  getMin(): number {
    return this.min;
  }
  // #endregion
}
