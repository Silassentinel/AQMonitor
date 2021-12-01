// Imports
import IDaily from '../../Interfaces/WAQI/IDaily';
import O3 from './O3';
import Pm10 from './Pm10';
import Pm25 from './Pm25';
import Uvi from './Uvi';
import DailyException from '../../../Utils/Exceptions/Model/DailyException';
/**
 * Daily class
 */
export default class Daily implements IDaily {
  // #region Props
  id!: string;
  o3!: O3[];
  pm10!: Pm10[];
  pm25!: Pm25[];
  uvi!: Uvi[];
  // #endregion
  // #region Ctor
  /**
   * Ctor
   * @param o3 {O3[]} Ozone values
   * @param pm10 {Pm10[]} Particulate matter 10 values
   * @param pm25 {Pm25[]} Particulate matter 25 values
   * @param uvi {Uvi[]} Ultraviolet index values
   */
  constructor(o3: O3[], pm10: Pm10[], pm25: Pm25[], uvi: Uvi[]) {
    this.setO3(o3);
    this.setPm10(pm10);
    this.setPm25(pm25);
    this.setUvi(uvi);
  }
  // #endregion
  // #region Meths
  /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
  setId(id: string): void {
    if (id === undefined || id.trim() === '') {
      throw new DailyException('Id', 'Id is required', new Error(), id);
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
   * Gets the ozone values
   */
  getO3(): O3[] {
    return this.o3;
  }
  /**
   * Sets the ozone values
   * @param o3 {O3[]} Ozone values
   */
  setO3(o3: O3[]): void {
    if (o3 === undefined || o3.length === 0) {
      throw new DailyException('O3', 'O3 is required', new Error(), o3);
    }
    this.o3 = o3;
  }
  /**
   * Gets the particulate matter 10 values
   */
  getPm10(): Pm10[] {
    return this.pm10;
  }
  /**
   * Sets the particulate matter 10 values
   * @param pm10 {Pm10[]} Particulate matter 10 values
   */
  setPm10(pm10: Pm10[]): void {
    if (pm10 === undefined || pm10.length === 0) {
      throw new DailyException('Pm10', 'Pm10 is required', new Error(), pm10);
    }
    this.pm10 = pm10;
  }
  /**
   * Gets the particulate matter 25 values
   */
  getPm25(): Pm25[] {
    return this.pm25;
  }
  /**
   * Sets the particulate matter 25 values
   * @param pm25 {Pm25[]} Particulate matter 25 values
   */
  setPm25(pm25: Pm25[]): void {
    if (pm25 === undefined || pm25.length === 0) {
      throw new DailyException('Pm25', 'Pm25 is required', new Error(), pm25);
    }
    this.pm25 = pm25;
  }
  /**
   * Gets the UV index values
   */
  getUvi(): Uvi[] {
    return this.uvi;
  }
  /**
   * Sets the UV index values
   * @param uvi {Uvi[]} UV index values
   */
  setUvi(uvi: Uvi[]): void {
    if (uvi === undefined || uvi.length === 0) {
      throw new DailyException('Uvi', 'Uvi is required', new Error(), uvi);
    }
    this.uvi = uvi;
  }
  // #endregion
}
