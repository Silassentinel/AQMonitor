// Imports
import TException from '../../../Utils/Exceptions/Model/TException';
import IT from '../../Interfaces/WAQI/IT';
/**
 * @class T
 */
export default class T implements IT {
  // #region Props
  id!: string;
  value!: number;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} v - Value.
   */
  constructor(v: number) {
    this.setValue(v);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new TException(
        'SO2 Exception',
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
   * Sets the value of Sulphur Dioxide.
   * @param v {number} - Value.
   */
  setValue(v: number): void {
    if (v === undefined || v < 0) {
      throw new TException(
        'SO2 Exception',
        'Value cannot be undefined or less than 0',
        new Error(),
        v
      );
    }
    this.value = v;
  }
  /**
   * Gets the value of Sulphur Dioxide.
   */
  getValue(): number {
    return this.value;
  }
  // #endregion
}
