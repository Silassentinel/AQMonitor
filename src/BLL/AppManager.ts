//#region Imports

import IUnitOfWork from './IUnitOfWork';
import IAttribution from './Models/Interfaces/WAQI/IAttribution';
import ApplicationManagerException from './Utils/Exceptions/ApplicationManagerException';

//#endregion
/**
 * AppManager
 */
export default class AppManager {
  //#region Props
  private readonly _uow: IUnitOfWork;
  //#endregion
  //#region CTOR
  /**
   * CTOR
   * @param uow {IUnitOfWork} The unit of work
   */
  constructor(uow: IUnitOfWork) {
    if (uow === null || uow === undefined) {
      throw new ApplicationManagerException(
        'App man exception',
        'Unit of work cannot be null or undefined',
        new Error(),
        uow
      );
    }
    this._uow = uow;
  }
  //#endregion
  //#region Methods
  // implementation of each repo method + logic here
  //#region Attributions
  /**
   * Get all attributions
   */
  public async getAllAttributions(): Promise<IAttribution[]> {
    return await this._uow.Attributions.getAll();
  }
  //#endregion
  //#region Cities
  //#endregion
  //#region Carbon Monoxide
  //#endregion
  //#region Dailies
  //#endregion
  //#region Debugs
  //#endregion
  //#region Forecasts
  //#endregion
  //#region Hydrogens
  //#endregion
  //#region Air quality indexes
  //#endregion
  //#region NO2s
  //#endregion
  //#region Ozones
  //#endregion
  //#region Phosphorus
  //#endregion
  //#region PM10s
  //#endregion
  //#region PM25s
  //#endregion
  //#region SO2s
  //#endregion
  //#region Ts
  //#endregion
  //#region Times
  //#endregion
  //#region Uvis
  //#endregion
  //#region Ws
  //#endregion
  //#region WeatherDatas
  //#endregion
  //#endregion
}
