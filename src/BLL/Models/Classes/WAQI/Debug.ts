//Imports
import IDebug from '../../Interfaces/WAQI/IDebug';
/**
 * Debug class
 */
export default class Debug implements IDebug {
  // #region Props
  sync: string;
  // #endregion
  // #region Ctor
  constructor(sync: string) {
    this.sync = sync;
  }
  // #endregion
  // #region Meths
  // #endregion
}
