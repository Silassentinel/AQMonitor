// Imports
import SO2Exception from "../../../Utils/Exceptions/Model/SO2Exception";
import ISo2 from "../../Interfaces/WAQI/ISo2";
/**
 * So2 model.
 */
export default class So2 implements ISo2 {
  // #region Props
  id!:string;
  value!: number;
  // #endregion
  // #region Ctor
  /**
   * Constructor
   * @param {number} v - Value.
   */
  constructor(v: number) {
    this.setValue(v);
  }
  // #endregion
  // #region Meths
    /**
   * Sets the Id
   * @param id {string} The unique identifier
   */
     setId(id:string): void{
      if(id === undefined ||id.trim() === ''){
        throw new SO2Exception('SO2 Exception',"Id cannot be undefined or empty",new Error(), id);
      }
      this.id = id;
     }
     /**
      * Gets the Id
      */
     getId():string{
       return this.id;
     }
  /**
   * Sets the value of Sulphur Dioxide.
   * @param v {number} - Value.
   */
  setValue(v: number):void {
    if(v === undefined ||v <0){
      throw new SO2Exception('SO2 Exception',"Value cannot be undefined or less than 0",new Error(), v);
    }
    this.value = v;
  }
  /**
   * Gets the value of Sulphur Dioxide.
   */
  getValue():number {
    return this.value;
  }
  // #endregion
}
