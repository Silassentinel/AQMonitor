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
import IaqiException from '../../../Utils/Exceptions/Model/IaqiException';
/**
 * @class Iaqi
 */
export default class Iaqi implements IIaqi {
  // #region Props
  id!: string;
  co!: Co;
  h!: H;
  no2!: No2;
  o3!: O3;
  p!: P;
  pm10!: Pm10;
  pm25!: Pm25;
  so2!: So2;
  t!: T;
  w!: W;
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
    this.setCo(co);
    this.setH(h);
    this.setNo2(no2);
    this.setO3(o3);
    this.setP(p);
    this.setPm10(pm10);
    this.setPm25(pm25);
    this.setSo2(so2);
    this.setT(t);
    this.setW(w);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new IaqiException(
        'IaqiException',
        'id is undefined or empty',
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
   * Sets the carbon monoxide
   * @param co {Co} Carbon monoxide
   */
  setCo(co: Co): void {
    if (co === null || co === undefined) {
      throw new IaqiException(
        'IaqiException',
        'co is null or undefined',
        new Error(),
        co
      );
    }
    this.co = co;
  }
  /**
   * Gets the carbon monoxide
   */
  getCo(): Co {
    return this.co;
  }
  /**
   * Sets the humidity
   * @param h {H} Humidity
   */
  setH(h: H): void {
    if (h === null || h === undefined) {
      throw new IaqiException(
        'IaqiException',
        'h is null or undefined',
        new Error(),
        h
      );
    }
    this.h = h;
  }
  /**
   * Gets the Humidity
   */
  getH(): H {
    return this.h;
  }
  /**
   * Sets the NO2
   * @param no2 {No2} Nitrogen dioxide
   */
  setNo2(no2: No2): void {
    if (no2 === null || no2 === undefined) {
      throw new IaqiException(
        'IaqiException',
        'no2 is null or undefined',
        new Error(),
        no2
      );
    }
    this.no2 = no2;
  }
  /**
   * Gets the NO2
   */
  getNo2(): No2 {
    return this.no2;
  }
  /**
   * Sets the ozone
   * @param o3 {O3} Ozone
   */
  setO3(o3: O3): void {
    if (o3 === null || o3 === undefined) {
      throw new IaqiException(
        'IaqiException',
        'o3 is null or undefined',
        new Error(),
        o3
      );
    }
    this.o3 = o3;
  }
  /**
   * Gets the ozone
   */
  getO3(): O3 {
    return this.o3;
  }
  /**
   * Sets the Phospherous
   * @param p {P} Phospherous
   */
  setP(p: P): void {
    if (p === null || p === undefined) {
      throw new IaqiException(
        'IaqiException',
        'p is null or undefined',
        new Error(),
        p
      );
    }
    this.p = p;
  }
  /**
   * Gets the phospherous
   */
  getP(): P {
    return this.p;
  }
  /**
   * Sets the Particulate matter
   * @param pm10 {Pm10} Particulate matter
   */
  setPm10(pm10: Pm10): void {
    if (pm10 === null || pm10 === undefined) {
      throw new IaqiException(
        'IaqiException',
        'pm10 is null or undefined',
        new Error(),
        pm10
      );
    }
    this.pm10 = pm10;
  }
  /**
   * Gets the Particulate matter
   */
  getPm10(): Pm10 {
    return this.pm10;
  }
  /**
   * Sets the Particulate matter
   * @param pm25 {Pm25} Particulate matter
   */
  setPm25(pm25: Pm25): void {
    if (pm25 === null || pm25 === undefined) {
      throw new IaqiException(
        'IaqiException',
        'pm25 is null or undefined',
        new Error(),
        pm25
      );
    }
    this.pm25 = pm25;
  }
  /**
   * Gets the Particulate matter
   */
  getPm25(): Pm25 {
    return this.pm25;
  }
  /**
   * Sets the Sulphur dioxide
   * @param so2 {So2} Sulphur dioxide
   */
  setSo2(so2: So2): void {
    if (so2 === null || so2 === undefined) {
      throw new IaqiException(
        'IaqiException',
        'so2 is null or undefined',
        new Error(),
        so2
      );
    }
    this.so2 = so2;
  }
  /**
   * Gets the Sulphur dioxide
   */
  getSo2(): So2 {
    return this.so2;
  }
  /**
   * Sets the temperature
   * @param t {T} Temperature
   */
  setT(t: T): void {
    if (t === null || t === undefined) {
      throw new IaqiException(
        'IaqiException',
        't is null or undefined',
        new Error(),
        t
      );
    }
    this.t = t;
  }
  /**
   * Gets the temperature
   */
  getT(): T {
    return this.t;
  }
  /**
   * Sets the wind
   * @param w {W} Wind
   */
  setW(w: W): void {
    if (w === null || w === undefined) {
      throw new IaqiException(
        'IaqiException',
        'w is null or undefined',
        new Error(),
        w
      );
    }
    this.w = w;
  }
  /**
   * Gets the wind
   */
  getW(): W {
    return this.w;
  }
  // #endregion
}
