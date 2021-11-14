//Imports
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
  // #endregion
}
