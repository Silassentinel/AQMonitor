// #region imports
import ICo from '../../../BLL/Models/Interfaces/WAQI/ICo';
import DbContext from '../../DbContext/DbContext';
import ICORepo from '../../../BLL/Repos/WAQI/ICORepo';
// #endregion
/**
 * Co repo class
 */
class CoRepo implements ICORepo {
  // #region Ctor
  constructor(dbContext: DbContext) {
    this._dbContext = dbContext;
  }
  // #endregion
  // #region Properties
  private _dbContext: DbContext;
  // #endregion
  // #region Methods
  getAll(): Promise<ICo[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<ICo> {
    throw new Error('Method not implemented.');
  }
  getByValue(value: number): Promise<ICo> {
    throw new Error('Method not implemented.');
  }
  add(co: ICo): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(co: ICo): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  exists(id: string): Promise<boolean>;
  exists(value: number): Promise<boolean>;
  exists(value: unknown): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // #endregion
}

export default CoRepo;
