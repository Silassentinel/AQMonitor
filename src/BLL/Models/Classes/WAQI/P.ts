// Imports
import IP from '../../Interfaces/WAQI/IP';
import PException from '../../../Utils/Exceptions/Model/PException';
/**
 * @class P
 */
export default class P implements IP {
  // #region Props
  id!: string;
  value!: number;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} v
   */
  constructor(v: number) {
    this.value = v;
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new PException(
        'P exception',
        'Id cannot be empty',
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
   * Sets the value of Phosphorus
   * @param v {number} The value of Phosphorus
   */
  setValue(v: number) {
    if (v === undefined || v < 0) {
      throw new PException(
        'P exception',
        'Value cannot be less than 0 or undefined',
        new Error(),
        v
      );
    }
    this.value = v;
  }
  /**
   * Gets the value of Phosphorus
   */
  getValue(): number {
    return this.value;
  }
  // #endregion
}
