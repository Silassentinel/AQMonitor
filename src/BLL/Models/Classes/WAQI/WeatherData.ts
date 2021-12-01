//Imports
import WeatherDataException from '../../../Utils/Exceptions/Model/WeatherDataException';
import IWeatherData from '../../Interfaces/WAQI/IWeatherData';
import Attribution from './Attribution';
import City from './City';
import Debug from './Debug';
import Forecast from './Forecast';
import Iaqi from './Iaqi';
import Time from './Time';
/**
 * @class WeatherData
 */
export default class WeatherData implements IWeatherData {
  // #region Props
  id!: string;
  aqi: number;
  idx: number;
  attributions: Attribution[];
  city: City;
  dominentpol: string;
  iaqi: Iaqi;
  time: Time;
  forecast: Forecast;
  debug: Debug;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} aqi
   * @param {number} idx
   * @param {Attribution} attributions
   * @param {City} city
   * @param {string} dominentpol
   * @param {Iaqi} iaqi
   * @param {Time} time
   * @param {Forecast} forecast
   * @param {Debug} debug
   */
  constructor(
    aqi: number,
    idx: number,
    attributions: Attribution[],
    city: City,
    dominentpol: string,
    iaqi: Iaqi,
    time: Time,
    forecast: Forecast,
    debug: Debug
  ) {
    this.aqi = aqi;
    this.idx = idx;
    this.attributions = attributions;
    this.city = city;
    this.dominentpol = dominentpol;
    this.iaqi = iaqi;
    this.time = time;
    this.forecast = forecast;
    this.debug = debug;
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or empty',
        new Error(),
        id
      );
    }
    this.id = id;
  }
  /**
   * Gets the Id
   */
  getId(): string {
    return this.id;
  }
  /**
   * Sets the aqi
   * @param aqi {number} Air Quality Index
   */
  setAqi(aqi: number): void {
    if (aqi === undefined || aqi < 0) {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or less than 0',
        new Error(),
        aqi
      );
    }
    this.aqi = aqi;
  }
  /**
   * Gets the air quality index
   */
  getAqi(): number {
    return this.aqi;
  }
  /**
   * Sets the idx
   * @param idx {number} index
   */
  setIdx(idx: number): void {
    if (idx === undefined || idx < 0) {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or less than 0',
        new Error(),
        idx
      );
    }
    this.idx = idx;
  }
  /**
   * Gets the index
   */
  getIdx(): number {
    return this.idx;
  }
  /**
   * Sets the attributions
   * @param attributions {Attribution[]} Attribution list
   */
  setAttributions(attributions: Attribution[]): void {
    if (attributions === undefined || attributions.length === 0) {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or empty',
        new Error(),
        attributions
      );
    }
    this.attributions = attributions;
  }
  /**
   * Gets the attributions
   */
  getAttributions(): Attribution[] {
    return this.attributions;
  }
  /**
   * Sets the city
   * @param city {City} City
   */
  setCity(city: City): void {
    if (city === undefined) {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or empty',
        new Error(),
        city
      );
    }
    this.city = city;
  }
  /**
   * Gets the city
   */
  getCity(): City {
    return this.city;
  }
  /**
   * Sets the dominentpol
   * @param dominentpol {string} Dominent pol
   */
  setDominentpol(dominentpol: string): void {
    if (dominentpol === undefined || dominentpol === '') {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or empty',
        new Error(),
        dominentpol
      );
    }
    this.dominentpol = dominentpol;
  }
  /**
   * Gets the dominentpol
   */
  getDominentpol(): string {
    return this.dominentpol;
  }
  /**
   * Sets the iaqi
   * @param iaqi {Iaqi} Air Quality Index
   */
  setIaqi(iaqi: Iaqi): void {
    if (iaqi === undefined) {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or empty',
        new Error(),
        iaqi
      );
    }
    this.iaqi = iaqi;
  }
  /**
   * Gets the air quality index
   */
  getIaqi(): Iaqi {
    return this.iaqi;
  }
  /**
   * Sets the time
   * @param time {Time} Time
   */
  setTime(time: Time): void {
    if (time === undefined) {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or empty',
        new Error(),
        time
      );
    }
    this.time = time;
  }
  /**
   * Gets the time
   */
  getTime(): Time {
    return this.time;
  }
  /**
   * Sets the forecast
   * @param forecast {Forecast} Forecast
   */
  setForecast(forecast: Forecast): void {
    if (forecast === undefined) {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or empty',
        new Error(),
        forecast
      );
    }
    this.forecast = forecast;
  }
  /**
   * Gets the forecast
   */
  getForecast(): Forecast {
    return this.forecast;
  }
  /**
   * Sets the debug
   * @param debug {Debug} Debug
   */
  setDebug(debug: Debug): void {
    if (debug === undefined) {
      throw new WeatherDataException(
        'WeahterData exception',
        'Cannot be undeff or empty',
        new Error(),
        debug
      );
    }
    this.debug = debug;
  }
  /**
   * Gets the debug
   */
  getDebug(): Debug {
    return this.debug;
  }
  // #endregion
}
