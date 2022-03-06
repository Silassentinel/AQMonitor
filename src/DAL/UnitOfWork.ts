// #region imports
import IAttributionRepo from "../BLL/Repos/WAQI/IAttributionRepo";
import ICityRepo from "../BLL/Repos/WAQI/ICityRepo";
import ICORepo from "../BLL/Repos/WAQI/ICORepo";
import IDailyRepo from "../BLL/Repos/WAQI/IDailyRepo";
import IDebugRepo from "../BLL/Repos/WAQI/IDebugRepo";
import IForecastRepo from "../BLL/Repos/WAQI/IForecastRepo";
import IHRepo from "../BLL/Repos/WAQI/IHRepo";
import IIaqiRepo from "../BLL/Repos/WAQI/IIaqiRepo";
import INO2Repo from "../BLL/Repos/WAQI/INO2Repo";
import IO3Repo from "../BLL/Repos/WAQI/IO3Repo";
import IPM10Repo from "../BLL/Repos/WAQI/IPM10Repo";
import IPM25Repo from "../BLL/Repos/WAQI/IPM25Repo";
import IPRepo from "../BLL/Repos/WAQI/IPRepo";
import ISO2Repo from "../BLL/Repos/WAQI/ISO2Repo";
import ITimeRepo from "../BLL/Repos/WAQI/ITimeRepo";
import ITRepo from "../BLL/Repos/WAQI/ITRepo";
import IUVIRepo from "../BLL/Repos/WAQI/IUVIRepo";
import IWeatherDataRepo from "../BLL/Repos/WAQI/IWeatherDataRepo";
import IWRepo from "../BLL/Repos/WAQI/IWRepo";
import IUnitOfWork from "../BLL/IUnitOfWork";
import DbContext from "../DAL/DbContext/DbContext";
import IApiResponseRepo from "../BLL/Repos/IApiResponseRepo";
// #endregion

/**
 * Unit of Work
 */
class UnitOfWork implements IUnitOfWork {
    private _dbContext: DbContext;
    private _repositories: { [key: string]: Repository<any> } = {};

    constructor(dbContext: DbContext) {
        this._dbContext = dbContext;
    }
    ApiResponses: IApiResponseRepo;
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
    Complete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

