// Imports
import IO3 from './IO3';
import IPm10 from './IPm10';
import IPm25 from './IPm25';
import IUvi from './IUvi';
/**
 * Interface for Daily
 */
export default interface IDaily {
  o3: IO3[];
  pm10: IPm10[];
  pm25: IPm25[];
  uvi: IUvi[];
}
