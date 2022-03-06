// #region imports
import ICity from '../../../BLL/Models/Interfaces/WAQI/ICity';
import ICityRepo from '../../../BLL/Repos/WAQI/ICityRepo';
import DbContext from '../../DbContext/DbContext';
// #endregion
/**
 * CityRepo class
 */
class CityRepo implements ICityRepo {
  // #region Ctor
  /**
   * Ctor
   */
  constructor(context: DbContext) {
    this._context = context;
  }
  // #endregion
  // #region Properties
  private _context: DbContext;
  // #endregion
  // #region Methods
  getAll(): Promise<ICity[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<ICity> {
    throw new Error('Method not implemented.');
  }
  getByName(name: string): Promise<ICity> {
    throw new Error('Method not implemented.');
  }
  getByGeo(geo: number[]): Promise<ICity> {
    throw new Error('Method not implemented.');
  }
  getByUrl(url: string): Promise<ICity> {
    throw new Error('Method not implemented.');
  }
  add(city: ICity): Promise<ICity> {
    throw new Error('Method not implemented.');
  }
  update(city: ICity): Promise<ICity> {
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
  existsByGeo(geo: number[]): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  existsByUrl(url: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // #endregion
}

export default CityRepo;
