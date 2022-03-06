// #region Imports
import IDaily from 'src/BLL/Models/Interfaces/WAQI/IDaily';
import DbContext from 'src/DAL/DbContext/DbContext';
import IDailyRepo from '../../../BLL/Repos/WAQI/IDailyRepo';
// #endregion

/**
 * DailyRepo class
 */
class Dailyrepo implements IDailyRepo {
  // #region Ctor
  constructor(dbContext: DbContext) {
    this._dbContext = dbContext;
  }
  // #endregion
  // #region Properties
  private _dbContext: DbContext;
  // #endregion
  // #region Methods
  getById(id: string): Promise<IDaily> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<IDaily[]> {
    throw new Error('Method not implemented.');
  }
  add(daily: IDaily): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(daily: IDaily): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  exists(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // #endregion
}
export default Dailyrepo;
