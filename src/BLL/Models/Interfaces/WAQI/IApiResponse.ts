// imports
import IWeatherData from './IWeatherData';
/**
 * Interface for the API response
 */
export default interface IApiResponse {
  status: string;
  data: IWeatherData;
}
