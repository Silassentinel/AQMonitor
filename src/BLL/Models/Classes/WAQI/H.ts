// Imports
import IH from '../../Interfaces/WAQI/IH';
import HException from '../../../Utils/Exceptions/Model/HException';
/**
 * @class H
 */
export default class H implements IH {
  // #region Props
  id!: string;
  value!: number;
  // #endregion
  // #region Ctor
  constructor(value: number) {
    this.setValue(value);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new HException(
        'HException',
        'Id is undefined or empty',
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
   * Sets the value
   * @param value {number} the value of hydrogen
   */
  setValue(value: number): void {
    if (value === undefined || value < 0) {
      throw new HException(
        'Hexceptuion',
        'Value is undeff or below 0',
        new Error(),
        value
      );
    }
  }
  /**
   * Gets the value of hydrogen
   */
  getValue(): number {
    return this.value;
  }
  // #endregion
}
