// imports
import ICo from './ICo';
import IH from './IH';
import INo2 from './INo2';
import IO3 from './IO3';
import IPm10 from './IPm10';
import IPm25 from './IPm25';
import ISo2 from './ISo2';
import IT from './IT';
import IW from './IW';
import IP from './IP';
/**
 * Interface for IAqi
 */
export default interface IIaqi {
  co: ICo;
  h: IH;
  no2: INo2;
  o3: IO3;
  p: IP;
  pm10: IPm10;
  pm25: IPm25;
  so2: ISo2;
  t: IT;
  w: IW;
}
