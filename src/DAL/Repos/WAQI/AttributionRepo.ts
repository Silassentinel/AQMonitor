// #region imports
import DbContext from '../../DbContext/DbContext';
import IAttribution from '../../../BLL/Models/Interfaces/WAQI/IAttribution';
import IAttributionRepo from '../../../BLL/Repos/WAQI/IAttributionRepo';
// #endregion
/**
 * Attribution repo
 */
class AttributionRepo implements IAttributionRepo {
  // #region Ctor
  constructor(dbContext: DbContext) {
    this._dbContext = dbContext;
  }
  // #endregion
  // #region Properties
  private _dbContext: DbContext;
  // #endregion
  // #region Methods
  getById(id: string): Promise<IAttribution> {
    throw new Error('Method not implemented.');
  }
  getByName(name: string): Promise<IAttribution> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<IAttribution[]> {
    throw new Error('Method not implemented.');
  }
  getByUrl(url: string): Promise<IAttribution> {
    throw new Error('Method not implemented.');
  }
  add(attribution: IAttribution): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(attribution: IAttribution): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  exists(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  existsByName(name: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  existsByUrl(url: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // #endregion
}

export default AttributionRepo;
