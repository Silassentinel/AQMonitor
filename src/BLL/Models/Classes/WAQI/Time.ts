// Imports
import TimeException from '../../../Utils/Exceptions/Model/TimeException';
import ITime from '../../Interfaces/WAQI/ITime';
/**
 * @class Time
 */
export default class Time implements ITime {
  // #region Props
  id!: string;
  s!: string;
  timeZone!: string;
  value!: number;
  iso!: string;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {string} s
   * @param {string} tz
   * @param {number} v
   * @param {string} iso
   */
  constructor(s: string, tz: string, v: number, iso: string) {
    this.setS(s);
    this.setTimeZone(tz);
    this.setValue(v);
    this.setIso(iso);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new TimeException(
        'Time Exception',
        'Id cannot be undefined or empty',
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
   * Sets the s property
   * @param s {string}
   */
  setS(s: string): void {
    if (s === undefined || s.trim() === '') {
      throw new TimeException(
        'Time Exception',
        'S cannot be undefined or empty',
        new Error(),
        s
      );
    }
    this.s = s;
  }
  /**
   * Gets the s property
   */
  getS(): string {
    return this.s;
  }
  /**
   * Sets the Time zone
   * @param tz {string} Timezone
   */
  setTimeZone(tz: string): void {
    if (tz === undefined || tz.trim() === '') {
      throw new TimeException(
        'Time Exception',
        'Time zone cannot be undefined or empty',
        new Error(),
        tz
      );
    }
    this.timeZone = tz;
  }
  /**
   * Gets the Time zone
   */
  getTimeZone(): string {
    return this.timeZone;
  }
  /**
   * Sets the value
   * @param v {number} The value
   */
  setValue(v: number): void {
    if (v === undefined || v < 0) {
      throw new TimeException(
        'Time Exception',
        'Value cannot be undefined or null',
        new Error(),
        v
      );
    }
    this.value = v;
  }
  /**
   * Gets the value
   */
  getValue(): number {
    return this.value;
  }
  /**
   * Sets the iso
   * @param iso {string}
   */
  setIso(iso: string): void {
    if (iso === undefined || iso.trim() === '') {
      throw new TimeException(
        'Time Exception',
        'ISO cannot be undefined or empty',
        new Error(),
        iso
      );
    }
    this.iso = iso;
  }
  /**
   * Gets the iso
   */
  getIso(): string {
    return this.iso;
  }
  // #endregion
}
