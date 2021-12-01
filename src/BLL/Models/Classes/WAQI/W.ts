// Imports
import WException from '../../../Utils/Exceptions/Model/WException';
import IW from '../../Interfaces/WAQI/IW';
/**
 * @class W
 */
export default class W implements IW {
  // #region Props
  id!: string;
  value!: number;
  // #endregion
  // #region Ctor
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
      throw new WException('WException', 'Id cannot be empty', new Error(), id);
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
   * @param v {number} Value of wind
   */
  setValue(v: number) {
    if (v === undefined || v < 0) {
      throw new WException(
        'WExceptuion',
        'Wind cannot be undeff or less than 0',
        new Error(),
        v
      );
    }
    this.value = v;
  }
  /**
   * Gets the value
   */
  GetValue(): number {
    return this.value;
  }
  // #endregion
}
