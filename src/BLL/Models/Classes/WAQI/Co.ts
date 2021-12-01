// Imports
import ICo from '../../Interfaces/WAQI/ICo';
import COException from '../../../Utils/Exceptions/Model/COException';
/**
 * @class Co
 */
export default class Co implements ICo {
  // #region Props
  id!: string;
  value!: number;
  // #endregion
  // #region Ctor
  /**
   * Ctor
   * @param v {number} The value of the Carbon Monoxide
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
      throw new COException(
        'COException',
        'Id cannot be undefined nor empty',
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
   * Gets the value of the Carbon Monoxide
   */
  getValue(): number {
    return this.value;
  }
  /**
   * Sets the value of the Carbon Monoxide
   * @param value {number} The value of the Carbon Monoxide
   */
  setValue(value: number): void {
    if (value === undefined || value < 0) {
      throw new COException(
        'COException',
        'Value cannot be undefined nor less than 0',
        new Error(),
        value
      );
    }
  }
  // #endregion
}
