// Imports
import Co from './Co';
import H from './H';
import No2 from './No2';
import O3 from './O3';
import Pm10 from './Pm10';
import Pm25 from './Pm25';
import So2 from './So2';
import T from './T';
import W from './W';
import P from './P';
import IIaqi from '../../Interfaces/WAQI/IIaqi';
/**
 * @class Iaqi
 */
export default class Iaqi implements IIaqi {
  // #region Props
  co: Co;
  h: H;
  no2: No2;
  o3: O3;
  p: P;
  pm10: Pm10;
  pm25: Pm25;
  so2: So2;
  t: T;
  w: W;
  // #endregion
  // #region Ctor
  /**
   * Cosntructor
   * @param co Co
   * @param h H
   * @param no2 No2
   * @param o3 O3
   * @param p P
   * @param pm10 Pm10
   * @param pm25 Pm25
   * @param so2 So2
   * @param t T
   * @param w W
   */
  constructor(
    co: Co,
    h: H,
    no2: No2,
    o3: O3,
    p: P,
    pm10: Pm10,
    pm25: Pm25,
    so2: So2,
    t: T,
    w: W
  ) {
    this.co = co;
    this.h = h;
    this.no2 = no2;
    this.o3 = o3;
    this.p = p;
    this.pm10 = pm10;
    this.pm25 = pm25;
    this.so2 = so2;
    this.t = t;
    this.w = w;
  }
  // #endregion
  // #region Meths
  // #endregion
}
