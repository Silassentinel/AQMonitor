//#region Imports
import IApiResponseRepo from './Repos/IApiResponseRepo';
import IAttributionRepo from './Repos/WAQI/IAttributionRepo';
import ICityRepo from './Repos/WAQI/ICityRepo';
import ICORepo from './Repos/WAQI/ICORepo';
import IDailyRepo from './Repos/WAQI/IDailyRepo';
import IDebugRepo from './Repos/WAQI/IDebugRepo';
import IForecastRepo from './Repos/WAQI/IForecastRepo';
import IHRepo from './Repos/WAQI/IHRepo';
import IIaqiRepo from './Repos/WAQI/IIaqiRepo';
import INO2Repo from './Repos/WAQI/INO2Repo';
import IO3Repo from './Repos/WAQI/IO3Repo';
import IPM10Repo from './Repos/WAQI/IPM10Repo';
import IPM25Repo from './Repos/WAQI/IPM25Repo';
import IPRepo from './Repos/WAQI/IPRepo';
import ISO2Repo from './Repos/WAQI/ISO2Repo';
import ITimeRepo from './Repos/WAQI/ITimeRepo';
import ITRepo from './Repos/WAQI/ITRepo';
import IUVIRepo from './Repos/WAQI/IUVIRepo';
import IWeatherDataRepo from './Repos/WAQI/IWeatherDataRepo';
import IWRepo from './Repos/WAQI/IWRepo';
//#endregion
/**
 * Interfeace IUnitOfWork
 */
export default interface IUnitOfWork {
  //#region Properties
  Attributions: IAttributionRepo;
  Cities: ICityRepo;
  Cos: ICORepo;
  Dailies: IDailyRepo;
  Debugs: IDebugRepo;
  Forecasts: IForecastRepo;
  Hs: IHRepo;
  Iaqis: IIaqiRepo;
  NO2s: INO2Repo;
  O3s: IO3Repo;
  Ps: IPRepo;
  PM10s: IPM10Repo;
  PM25s: IPM25Repo;
  SO2s: ISO2Repo;
  ITs: ITRepo;
  Times: ITimeRepo;
  Uvis: IUVIRepo;
  Ws: IWRepo;
  WeatherDatas: IWeatherDataRepo;
  ApiResponses: IApiResponseRepo;
  //#endregion
  //#region Methods
  Complete(): Promise<void>;
  //#endregion
}
