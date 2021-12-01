// Imports
import INo2 from '../../Interfaces/WAQI/INo2';
import NO2Exception from '../../../Utils/Exceptions/Model/NO2Exception';
/**
 * @class No2
 */
export default class No2 implements INo2 {
  // #region Props
  id!: string;
  value!: number;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} v - Value
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
      throw new NO2Exception(
        'NO2 Exception',
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
   * Sets value
   * @param v {number} - Value
   */
  setValue(v: number): void {
    if (v === null || v === undefined) {
      throw new NO2Exception(
        'NO2 Exception',
        'Value cannot be null or undeff',
        new Error(),
        v
      );
    }
    if (v < 0)
      throw new NO2Exception('', 'Value must be positive', new Error(), v);
    this.value = v;
  }
  /**
   * Gets value
   */
  getValue(): number {
    return this.value;
  }
  // #endregion
}
