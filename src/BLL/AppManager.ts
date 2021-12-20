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
    public async airQualityIndexExists(airQualityIndexId: string): Promise<boolean> {
        return await this._uow.Iaqis.exists(airQualityIndexId);
    }
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
