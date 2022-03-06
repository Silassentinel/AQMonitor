//#region Imports

import IUnitOfWork from './IUnitOfWork';
import IForecast from './Models/Interfaces/WAQI/IForecast';
import IAttribution from './Models/Interfaces/WAQI/IAttribution';
import ICity from './Models/Interfaces/WAQI/ICity';
import ICo from './Models/Interfaces/WAQI/ICo';
import IDaily from './Models/Interfaces/WAQI/IDaily';
import ApplicationManagerException from './Utils/Exceptions/ApplicationManagerException';
import IH from './Models/Interfaces/WAQI/IH';
import IIaqi from './Models/Interfaces/WAQI/IIaqi';
import INo2 from './Models/Interfaces/WAQI/INo2';
import IO3 from './Models/Interfaces/WAQI/IO3';
import IP from './Models/Interfaces/WAQI/IP';
import IPm10 from './Models/Interfaces/WAQI/IPm10';
import IPm25 from './Models/Interfaces/WAQI/IPm25';
import ISo2 from './Models/Interfaces/WAQI/ISo2';
import IT from './Models/Interfaces/WAQI/IT';
import ITime from './Models/Interfaces/WAQI/ITime';
import IUvi from './Models/Interfaces/WAQI/IUvi';
import IWeatherData from './Models/Interfaces/WAQI/IWeatherData';
import IW from './Models/Interfaces/WAQI/IW';

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
  /**
   * Get Attribution by id.
   * @param id {string} The id of the attribution
   */
  public async getAttributionById(id: string): Promise<IAttribution> {
    return await this._uow.Attributions.getById(id);
  }
  /**
   * Get by name
   * @param name {string} The name of the attribution
   */
  public async getAttributionByName(name: string): Promise<IAttribution> {
    return await this._uow.Attributions.getByName(name);
  }
  /**
   * Get by url
   */
  public async getAttributionByUrl(url: string): Promise<IAttribution> {
    return await this._uow.Attributions.getByUrl(url);
  }
  /**
   * Add a new attribution
   * @param attribution {IAttribution} The attribution to add
   */
  public async addAttribution(attribution: IAttribution): Promise<void> {
    await this._uow.Attributions.add(attribution);
  }
  /**
   * Update an attribution
   * @param attribution {IAttribution} The attribution to update
   */
  public async updateAttribution(attribution: IAttribution): Promise<void> {
    await this._uow.Attributions.update(attribution);
  }
  /**
   * Delete an attribution
   * @param id {string} The id of the attribution to delete
   */
  public async deleteAttribution(id: string): Promise<void> {
    await this._uow.Attributions.delete(id);
  }
  /**
   * Check if an attribution exists
   */
  public async attributionExists(attributionId: string): Promise<boolean> {
    return await this._uow.Attributions.exists(attributionId);
  }
  /**
   * Attribution Exists by name
   * @param attributionName {string} The name of the attribution
   */
  public async attributionExistsByName(
    attributionName: string
  ): Promise<boolean> {
    return await this._uow.Attributions.existsByName(attributionName);
  }
  /**
   * Attribution Exists by url
   * @param attributionUrl {string} The url of the attribution
   */
  public async attributionExistsByUrl(
    attributionUrl: string
  ): Promise<boolean> {
    return await this._uow.Attributions.existsByUrl(attributionUrl);
  }
  //#endregion
  //#region Cities
  /**
   * Get all cities
   */
  public async getAllCities(): Promise<ICity[]> {
    return await this._uow.Cities.getAll();
  }
  /**
   * Get city by id.
   * @param id {string} The id of the city
   */
  public async getCityById(id: string): Promise<ICity> {
    return await this._uow.Cities.getById(id);
  }
  /**
   * Get City  by name
   * @param name {string} The name of the city
   */
  public async getCityByName(name: string): Promise<ICity> {
    return await this._uow.Cities.getByName(name);
  }
  /**
   * Get City by url
   * @param url {string} The url of the city
   */
  public async getCityByUrl(url: string): Promise<ICity> {
    return await this._uow.Cities.getByUrl(url);
  }
  /**
   * Get City by geo
   * @param geo {number[]} The geo of the city
   */
  public async getCityByGeo(geo: number[]): Promise<ICity> {
    return await this._uow.Cities.getByGeo(geo);
  }
  /**
   * Add a new city
   * @param city {ICity} The city to add
   */
  public async addCity(city: ICity): Promise<void> {
    await this._uow.Cities.add(city);
  }
  /**
   * Update a city
   * @param city {ICity} The city to update
   */
  public async updateCity(city: ICity): Promise<void> {
    await this._uow.Cities.update(city);
  }
  /**
   * Delete a city
   * @param id {string} The id of the city to delete
   */
  public async deleteCity(id: string): Promise<void> {
    await this._uow.Cities.delete(id);
  }
  /**
   * Check if a city exists by id
   * @param cityId {string} The id of the city
   */
  public async cityExists(cityId: string): Promise<boolean> {
    return await this._uow.Cities.exists(cityId);
  }
  /**
   * Check if a city exists by name
   * @param cityName {string} The name of the city
   */
  public async cityExistsByName(cityName: string): Promise<boolean> {
    return await this._uow.Cities.existsByName(cityName);
  }
  /**
   * Check if a city exists by url
   * @param cityUrl {string} The url of the city
   */
  public async cityExistsByUrl(cityUrl: string): Promise<boolean> {
    return await this._uow.Cities.existsByUrl(cityUrl);
  }
  /**
   * Check if a city exists by geo
   * @param cityGeo {number[]} The geo of the city
   */
  public async cityExistsByGeo(cityGeo: number[]): Promise<boolean> {
    return await this._uow.Cities.existsByGeo(cityGeo);
  }
  //#endregion
  //#region Carbon Monoxide
  /**
   * Get all carbon monoxide
   */
  public async getAllCarbonMonoxide(): Promise<ICo[]> {
    return await this._uow.Cos.getAll();
  }
  /**
   * Get Carbon Monoxide by id.
   * @param id {string} The id of the carbon monoxide
   */
  public async getCarbonMonoxideById(id: string): Promise<ICo> {
    return await this._uow.Cos.getById(id);
  }
  /**
   * Get Carbon Monoxide by value
   * @param value {number} The value of the carbon monoxide
   */
  public async getCarbonMonoxideByValue(value: number): Promise<ICo> {
    return await this._uow.Cos.getByValue(value);
  }
  /**
   * Add a new carbon monoxide
   * @param co {ICo} The carbon monoxide to add
   */
  public async addCarbonMonoxide(co: ICo): Promise<void> {
    await this._uow.Cos.add(co);
  }
  /**
   * Update a carbon monoxide
   * @param co {ICo} The carbon monoxide to update
   */
  public async updateCarbonMonoxide(co: ICo): Promise<void> {
    await this._uow.Cos.update(co);
  }
  /**
   * Delete a carbon monoxide
   * @param id {string} The id of the carbon monoxide to delete
   */
  public async deleteCarbonMonoxide(id: string): Promise<void> {
    await this._uow.Cos.delete(id);
  }
  /**
   * Check if a carbon monoxide exists by id
   * @param coId {string} The id of the carbon monoxide
   */
  public async carbonMonoxideExists(coId: string): Promise<boolean> {
    return await this._uow.Cos.exists(coId);
  }
  /**
   * Check if a carbon monoxide exists by value
   * @param coValue {number} The value of the carbon monoxide
   */
  public async carbonMonoxideExistsByValue(coValue: number): Promise<boolean> {
    return await this._uow.Cos.exists(coValue);
  }
  //#endregion
  //#region Dailies
  /**
   * Get all daily
   */
  public async getAllDailies(): Promise<IDaily[]> {
    return await this._uow.Dailies.getAll();
  }
  /**
   * Get Daily by id.
   * @param id {string} The id of the daily
   */
  public async getDailyById(id: string): Promise<IDaily> {
    return await this._uow.Dailies.getById(id);
  }
  /**
   * Add a new daily
   * @param daily {IDaily} The daily to add
   */
  public async addDaily(daily: IDaily): Promise<void> {
    await this._uow.Dailies.add(daily);
  }
  /**
   * Update a daily
   * @param daily {IDaily} The daily to update
   */
  public async updateDaily(daily: IDaily): Promise<void> {
    await this._uow.Dailies.update(daily);
  }
  /**
   * Delete a daily
   * @param id {string} The id of the daily to delete
   */
  public async deleteDaily(id: string): Promise<void> {
    await this._uow.Dailies.delete(id);
  }
  /**
   * Check if a daily exists by id
   * @param dailyId {string} The id of the daily
   */
  public async dailyExists(dailyId: string): Promise<boolean> {
    return await this._uow.Dailies.exists(dailyId);
  }
  //#endregion
  //#region Debugs
  //TODO
  //#endregion
  //#region Forecasts
  /**
   * Get all forecasts
   */
  public async getAllForecasts(): Promise<IForecast[]> {
    return await this._uow.Forecasts.getAll();
  }
  /**
   * Get Forecast by id.
   * @param id {string} The id of the forecast
   */
  public async getForecastById(id: string): Promise<IForecast> {
    return await this._uow.Forecasts.getById(id);
  }
  /**
   * Add a new forecast
   * @param forecast {IForecast} The forecast to add
   */
  public async addForecast(forecast: IForecast): Promise<void> {
    await this._uow.Forecasts.add(forecast);
  }
  /**
   * Update a forecast
   * @param forecast {IForecast} The forecast to update
   */
  public async updateForecast(forecast: IForecast): Promise<void> {
    await this._uow.Forecasts.update(forecast);
  }
  /**
   * Delete a forecast
   * @param id {string} The id of the forecast to delete
   */
  public async deleteForecast(id: string): Promise<void> {
    await this._uow.Forecasts.delete(id);
  }
  /**
   * Check if a forecast exists by id
   * @param forecastId {string} The id of the forecast
   */
  public async forecastExists(forecastId: string): Promise<boolean> {
    return await this._uow.Forecasts.exists(forecastId);
  }
  //#endregion
  //#region Hydrogens
  /**
   * Get all hydrogens
   */
  public async getAllHydrogens(): Promise<IH[]> {
    return await this._uow.Hs.getAll();
  }
  /**
   * Get Hydrogen by id.
   * @param id {string} The id of the hydrogen
   */
  public async getHydrogenById(id: string): Promise<IH> {
    return await this._uow.Hs.get(id);
  }
  /**
   * Get by value
   * @param value {number} The value of the hydrogen
   */
  public async getHydrogenByValue(value: number): Promise<IH> {
    return await this._uow.Hs.getByValue(value);
  }
  /**
   * Add a new hydrogen
   * @param hydrogen {IH} The hydrogen to add
   */
  public async addHydrogen(hydrogen: IH): Promise<void> {
    await this._uow.Hs.add(hydrogen);
  }
  /**
   * Update a hydrogen
   * @param hydrogen {IH} The hydrogen to update
   */
  public async updateHydrogen(hydrogen: IH): Promise<void> {
    await this._uow.Hs.update(hydrogen);
  }
  /**
   * Delete a hydrogen
   * @param id {string} The id of the hydrogen to delete
   */
  public async deleteHydrogen(id: string): Promise<void> {
    await this._uow.Hs.remove(id);
  }
  /**
   * Check if a hydrogen exists by id
   * @param hydrogenId {string} The id of the hydrogen
   */
  public async hydrogenExists(hydrogenId: string): Promise<boolean> {
    return await this._uow.Hs.exists(hydrogenId);
  }
  //#endregion
  //#region Air quality indexes
  /**
   * Get all air quality indexes
   */
  public async getAllAirQualityIndexes(): Promise<IIaqi[]> {
    return await this._uow.Iaqis.getAll();
  }
  /**
   * Get Air quality index by id.
   * @param id {string} The id of the air quality index
   */
  public async getAirQualityIndexById(id: string): Promise<IIaqi> {
    return await this._uow.Iaqis.getById(id);
  }
  /**
   * Add a new air quality index
   * @param airQualityIndex {IIaqi} The air quality index to add
   */
  public async addAirQualityIndex(airQualityIndex: IIaqi): Promise<void> {
    await this._uow.Iaqis.add(airQualityIndex);
  }
  /**
   * Update a air quality index
   * @param airQualityIndex {IIaqi} The air quality index to update
   */
  public async updateAirQualityIndex(airQualityIndex: IIaqi): Promise<void> {
    await this._uow.Iaqis.update(airQualityIndex);
  }
  /**
   * Delete a air quality index
   * @param id {string} The id of the air quality index to delete
   */
  public async deleteAirQualityIndex(id: string): Promise<void> {
    await this._uow.Iaqis.delete(id);
  }
  /**
   * Check if a air quality index exists by id
   * @param airQualityIndexId {string} The id of the air quality index
   */
  public async airQualityIndexExists(
    airQualityIndexId: string
  ): Promise<boolean> {
    return await this._uow.Iaqis.exists(airQualityIndexId);
  }
  //#endregion
  //#region NO2s
  /**
   * Gets all NO2s
   * @returns {Promise<INo2[]>}
   */
  public async getAllNO2s(): Promise<INo2[]> {
    return await this._uow.NO2s.getAll();
  }

  /**
   * Gets NO2 by id
   * @param id {string} The id of the NO2
   * @returns {Promise<INo2>}
   */
  public async getNO2ById(id: string): Promise<INo2> {
    return await this._uow.NO2s.getById(id);
  }

  /**
   * Gets NO2 by value
   * @param value {number} The value of the NO2
   * @returns {Promise<INo2[]>}
   */
  public async getNO2ByValue(value: number): Promise<INo2> {
    return await this._uow.NO2s.getByValue(value);
  }

  /**
   * Adds a new NO2
   * @param no2 {INo2} The NO2 to add
   * @returns {Promise<void>}
   */
  public async addNO2(no2: INo2): Promise<void> {
    await this._uow.NO2s.add(no2);
  }

  /**
   * Updates a NO2
   * @param no2 {INo2} The NO2 to update
   * @returns {Promise<void>}
   */
  public async updateNO2(no2: INo2): Promise<void> {
    await this._uow.NO2s.update(no2);
  }

  /**
   * Deletes a NO2
   * @param id {string} The id of the NO2 to delete
   * @returns {Promise<void>}
   */
  public async deleteNO2(id: string): Promise<void> {
    await this._uow.NO2s.delete(id);
  }

  /**
   * Checks if a NO2 exists by id
   * @param no2Id {string} The id of the NO2
   * @returns {Promise<boolean>}
   */
  public async no2Exists(no2Id: string): Promise<boolean> {
    return await this._uow.NO2s.exists(no2Id);
  }

  /**
   * Checks if a NO2 exists by value
   */
  public async no2ExistsByValue(value: number): Promise<boolean> {
    return await this._uow.NO2s.existsByValue(value);
  }
  //#endregion
  //#region O3s
  /**
   * Gets all O3s
   * @returns {Promise<IO3[]>}
   */
  public async getAllO3s(): Promise<IO3[]> {
    return await this._uow.O3s.getAll();
  }

  /**
   * Gets Ozone by id
   * @param id {string} The id of the Ozone
   * @returns {Promise<IO3>}
   */
  public async getOzoneById(id: string): Promise<IO3> {
    return await this._uow.O3s.getById(id);
  }

  /**
   * Adds a new Ozone
   * @param ozone {IO3} The Ozone to add
   * @returns {Promise<void>}
   */
  public async addOzone(ozone: IO3): Promise<void> {
    await this._uow.O3s.add(ozone);
  }

  /**
   * Updates a Ozone
   * @param ozone {IO3} The Ozone to update
   * @returns {Promise<void>}
   */
  public async updateOzone(ozone: IO3): Promise<void> {
    await this._uow.O3s.update(ozone);
  }

  /**
   * Deletes a Ozone
   * @param id {string} The id of the Ozone to delete
   * @returns {Promise<void>}
   */
  public async deleteOzone(id: string): Promise<void> {
    await this._uow.O3s.delete(id);
  }

  /**
   * Checks if a Ozone exists by id
   * @param ozoneId {string} The id of the Ozone
   * @returns {Promise<boolean>}
   */
  public async ozoneExists(ozoneId: string): Promise<boolean> {
    return await this._uow.O3s.Exist(ozoneId);
  }
  //#endregion
  //#region Phosphorus
  /**
   * Gets all Phosphorus
   * @returns {Promise<IPhosphorus[]>}
   */
  public async getAllPhosphorus(): Promise<IP[]> {
    return await this._uow.Ps.getAll();
  }

  /**
   * Gets Phosphorus by id
   * @param id {string} The id of the Phosphorus
   * @returns {Promise<IPhosphorus>}
   */
  public async getPhosphorusById(id: string): Promise<IP> {
    return await this._uow.Ps.getById(id);
  }

  /**
   * Adds a new Phosphorus
   * @param phosphorus {IPhosphorus} The Phosphorus to add
   * @returns {Promise<void>}
   */
  public async addPhosphorus(phosphorus: IP): Promise<void> {
    await this._uow.Ps.add(phosphorus);
  }

  /**
   * Updates a Phosphorus
   * @param phosphorus {IPhosphorus} The Phosphorus to update
   * @returns {Promise<void>}
   */
  public async updatePhosphorus(phosphorus: IP): Promise<void> {
    await this._uow.Ps.update(phosphorus);
  }

  /**
   * Deletes a Phosphorus
   * @param id {string} The id of the Phosphorus to delete
   * @returns {Promise<void>}
   */
  public async deletePhosphorus(id: string): Promise<void> {
    await this._uow.Ps.deleteById(id);
  }

  /**
   * Checks if a Phosphorus exists by id
   * @param phosphorusId {string} The id of the Phosphorus
   * @returns {Promise<boolean>}
   */
  public async phosphorusExists(phosphorusId: string): Promise<boolean> {
    return await this._uow.Ps.exists(phosphorusId);
  }

  /**
   * Gets Phosphorus by value
   * @param value {number} The value of the Phosphorus
   * @returns {Promise<IPhosphorus>}
   */
  public async getPhosphorusByValue(value: number): Promise<IP> {
    return await this._uow.Ps.getByValue(value);
  }
  //#endregion
  //#region PM10s
  /**
   * Gets all PM10s
   * @returns {Promise<IPM10[]>}
   */
  public async getAllPM10s(): Promise<IPm10[]> {
    return await this._uow.PM10s.getAll();
  }

  /**
   * Gets PM10 by id
   * @param id {string} The id of the PM10
   * @returns {Promise<IPM10>}
   */
  public async getPM10ById(id: string): Promise<IPm10> {
    return await this._uow.PM10s.getById(id);
  }

  /**
   * Adds a new PM10
   * @param pm10 {IPM10} The PM10 to add
   * @returns {Promise<void>}
   */
  public async addPM10(pm10: IPm10): Promise<void> {
    await this._uow.PM10s.add(pm10);
  }

  /**
   * Updates a PM10
   * @param pm10 {IPM10} The PM10 to update
   * @returns {Promise<void>}
   */
  public async updatePM10(pm10: IPm10): Promise<void> {
    await this._uow.PM10s.update(pm10);
  }

  /**
   * Deletes a PM10
   * @param id {string} The id of the PM10 to delete
   * @returns {Promise<void>}
   */
  public async deletePM10(id: string): Promise<void> {
    await this._uow.PM10s.delete(id);
  }

  /**
   * Checks if a PM10 exists by id
   * @param pm10Id {string} The id of the PM10
   * @returns {Promise<boolean>}
   */
  public async pm10Exists(pm10Id: string): Promise<boolean> {
    return await this._uow.PM10s.exists(pm10Id);
  }
  //#endregion
  //#region PM25s
  /**
   * Gets all PM25s
   * @returns {Promise<IPM25[]>}
   * @memberof IRepository
   */
  public async getAllPM25s(): Promise<IPm25[]> {
    return await this._uow.PM25s.getAll();
  }

  /**
   * Gets PM25 by id
   * @param id {string} The id of the PM25
   * @returns {Promise<IPM25>}
   */
  public async getPM25ById(id: string): Promise<IPm25> {
    return await this._uow.PM25s.getById(id);
  }

  /**
   * Adds a new PM25
   * @param pm25 {IPM25} The PM25 to add
   * @returns {Promise<void>}
   */
  public async addPM25(pm25: IPm25): Promise<void> {
    return this._uow.PM25s.add(pm25);
  }

  /**
   * Updates a PM25
   * @param pm25 {IPM25} The PM25 to update
   * @returns {Promise<void>}
   */
  public async updatePM25(pm25: IPm25): Promise<void> {
    return this._uow.PM25s.update(pm25);
  }

  /**
   * Deletes a PM25
   * @param id {string} The id of the PM25 to delete
   * @returns {Promise<void>}
   */
  public async deletePM25(id: string): Promise<void> {
    return this._uow.PM25s.delete(id);
  }

  /**
   * Checks if a PM25 exists by id
   * @param pm25Id {string} The id of the PM25
   * @returns {Promise<boolean>}
   */
  public async pm25Exists(pm25Id: string): Promise<boolean> {
    return this._uow.PM25s.exists(pm25Id);
  }
  //#endregion
  //#region SO2s
  /**
   * Gets all SO2s
   * @returns {Promise<ISO2[]>}
   */
  public async getAllSO2s(): Promise<ISo2[]> {
    return await this._uow.SO2s.getAll();
  }

  /**
   * Gets SO2 by id
   * @param id {string} The id of the SO2
   * @returns {Promise<ISO2>}
   */
  public async getSO2ById(id: string): Promise<ISo2> {
    return await this._uow.SO2s.getById(id);
  }

  /**
   * Adds a new SO2
   * @param so2 {ISO2} The SO2 to add
   * @returns {Promise<void>}
   */
  public async addSO2(so2: ISo2): Promise<void> {
    return this._uow.SO2s.add(so2);
  }

  /**
   * Updates a SO2
   * @param so2 {ISO2} The SO2 to update
   * @returns {Promise<void>}
   */
  public async updateSO2(so2: ISo2): Promise<void> {
    return this._uow.SO2s.update(so2);
  }

  /**
   * Deletes a SO2
   * @param id {string} The id of the SO2 to delete
   * @returns {Promise<void>}
   */
  public async deleteSO2(id: string): Promise<void> {
    return this._uow.SO2s.delete(id);
  }

  /**
   * Checks if a SO2 exists by id
   * @param so2Id {string} The id of the SO2
   * @returns {Promise<boolean>}
   */
  public async so2Exists(so2Id: string): Promise<boolean> {
    return this._uow.SO2s.exists(so2Id);
  }
  //#endregion
  //#region Ts
  /**
   * Gets all Ts
   * @returns {Promise<IT[]>}
   * @memberof IRepository
   */
  public async getAllTs(): Promise<IT[]> {
    return await this._uow.ITs.getAll();
  }

  /**
   * Gets T by id
   * @param id {string} The id of the T
   * @returns {Promise<IT>}
   */
  public async getTById(id: string): Promise<IT> {
    return await this._uow.ITs.getById(id);
  }

  /**
   * Adds a new T
   * @param t {IT} The T to add
   * @returns {Promise<void>}
   */
  public async addT(t: IT): Promise<void> {
    return this._uow.ITs.add(t);
  }

  /**
   * Updates a T
   * @param t {IT} The T to update
   * @returns {Promise<void>}
   */
  public async updateT(t: IT): Promise<void> {
    return this._uow.ITs.update(t);
  }

  /**
   * Deletes a T
   * @param id {string} The id of the T to delete
   * @returns {Promise<void>}
   */
  public async deleteT(id: string): Promise<void> {
    return this._uow.ITs.delete(id);
  }

  /**
   * Checks if a T exists by id
   * @param tId {string} The id of the T
   * @returns {Promise<boolean>}
   */
  public async tExists(tId: string): Promise<boolean> {
    return this._uow.ITs.exists(tId);
  }
  //#endregion
  //#region Times
  /**
   * Gets all Times
   * @returns {Promise<ITime[]>}
   */
  public async getAllTimes(): Promise<ITime[]> {
    return await this._uow.Times.getAll();
  }

  /**
   * Gets Time by id
   * @param id {string} The id of the Time
   * @returns {Promise<ITime>}
   */
  public async getTimeById(id: string): Promise<ITime> {
    return await this._uow.Times.getById(id);
  }

  /**
   * Adds a new Time
   * @param time {ITime} The Time to add
   * @returns {Promise<void>}
   */
  public async addTime(time: ITime): Promise<void> {
    return this._uow.Times.add(time);
  }

  /**
   * Updates a Time
   * @param time {ITime} The Time to update
   * @returns {Promise<void>}
   */
  public async updateTime(time: ITime): Promise<void> {
    return this._uow.Times.update(time);
  }

  /**
   * Deletes a Time
   * @param id {string} The id of the Time to delete
   * @returns {Promise<void>}
   */
  public async deleteTime(id: string): Promise<void> {
    return this._uow.Times.delete(id);
  }

  /**
   * Checks if a Time exists by id
   * @param timeId {string} The id of the Time
   * @returns {Promise<boolean>}
   */
  public async timeExists(timeId: string): Promise<boolean> {
    return this._uow.Times.exists(timeId);
  }
  //#endregion
  //#region Uvis
  /**
   * Gets all Uvis
   * @returns {Promise<IUvi[]>}
   */
  public async getAllUvis(): Promise<IUvi[]> {
    return await this._uow.Uvis.getAll();
  }

  /**
   * Gets Uvi by id
   * @param id {string} The id of the Uvi
   * @returns {Promise<IUvi>}
   */
  public async getUviById(id: string): Promise<IUvi> {
    return await this._uow.Uvis.getById(id);
  }

  /**
   * Adds a new Uvi
   * @param uvi {IUvi} The Uvi to add
   * @returns {Promise<void>}
   */
  public async addUvi(uvi: IUvi): Promise<void> {
    return this._uow.Uvis.add(uvi);
  }

  /**
   * Updates a Uvi
   * @param uvi {IUvi} The Uvi to update
   * @returns {Promise<void>}
   */
  public async updateUvi(uvi: IUvi): Promise<void> {
    return this._uow.Uvis.update(uvi);
  }

  /**
   * Deletes a Uvi
   * @param id {string} The id of the Uvi to delete
   * @returns {Promise<void>}
   */
  public async deleteUvi(id: string): Promise<void> {
    return this._uow.Uvis.delete(id);
  }

  /**
   * Checks if a Uvi exists by id
   * @param uviId {string} The id of the Uvi
   * @returns {Promise<boolean>}
   */
  public async uviExists(uviId: string): Promise<boolean> {
    return this._uow.Uvis.exists(uviId);
  }
  //#endregion
  //#region Ws
  /**
   * Gets all Ws
   * @returns {Promise<IWs[]>}
   */
  public async getAllWs(): Promise<IW[]> {
    return await this._uow.Ws.getAll();
  }

  /**
   * Gets W by id
   * @param id {string} The id of the W
   * @returns {Promise<IWs>}
   */
  public async getWById(id: string): Promise<IW> {
    return await this._uow.Ws.getById(id);
  }

  /**
   * Adds a new W
   * @param w {IWs} The W to add
   * @returns {Promise<void>}
   */
  public async addW(w: IW): Promise<void> {
    return this._uow.Ws.add(w);
  }

  /**
   * Updates a W
   * @param w {IWs} The W to update
   * @returns {Promise<void>}
   */

  public async updateW(w: IW): Promise<void> {
    return this._uow.Ws.update(w);
  }
  //#endregion
  //#region WeatherDatas
  /**
   * Gets all WeatherDatas
   * @returns {Promise<IWeatherData[]>}
   */
  public async getAllWeatherDatas(): Promise<IWeatherData[]> {
    return await this._uow.WeatherDatas.getAll();
  }

  /**
   * Gets WeatherData by id
   * @param id {string} The id of the WeatherData
   * @returns {Promise<IWeatherData>}
   */
  public async getWeatherDataById(id: string): Promise<IWeatherData> {
    return await this._uow.WeatherDatas.getById(id);
  }

  /**
   * Adds a new WeatherData
   * @param weatherData {IWeatherData} The WeatherData to add
   * @returns {Promise<void>}
   */
  public async addWeatherData(weatherData: IWeatherData): Promise<void> {
    return this._uow.WeatherDatas.add(weatherData);
  }

  /**
   * Updates a WeatherData
   * @param weatherData {IWeatherData} The WeatherData to update
   * @returns {Promise<void>}
   */
  public async updateWeatherData(weatherData: IWeatherData): Promise<void> {
    return this._uow.WeatherDatas.update(weatherData);
  }

  /**
   * Deletes a WeatherData
   * @param id {string} The id of the WeatherData to delete
   * @returns {Promise<void>}
   */
  public async deleteWeatherData(id: string): Promise<void> {
    return this._uow.WeatherDatas.delete(id);
  }

  /**
   * Checks if a WeatherData exists by id
   * @param weatherDataId {string} The id of the WeatherData
   * @returns {Promise<boolean>}
   */
  public async weatherDataExists(weatherDataId: string): Promise<boolean> {
    return this._uow.WeatherDatas.exists(weatherDataId);
  }
  //#endregion
  //#endregion
}
