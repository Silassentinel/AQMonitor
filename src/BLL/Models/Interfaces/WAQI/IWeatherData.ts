// Imports
import Attribution from './IAttribution';
import City from './ICity';
import IDebug from './IDebug';
import IForecast from './IForecast';
import Iaqi from './IIaqi';
import ITime from './ITime';
/**
 * Interface for the weather data
 */
export default interface IWeatherData {
  aqi: number;
  idx: number;
  attributions: Attribution[];
  city: City;
  dominentpol: string;
  iaqi: Iaqi;
  time: ITime;
  forecast: IForecast;
  debug: IDebug;
}
