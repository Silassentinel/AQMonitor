/**
 * Repo containing the response from the IWAQI API
 */

import IApiResponse from '../Models/Interfaces/WAQI/IApiResponse';

export default interface IApiResponseRepo {
  /**
   * The response from the IWAQI API
   * @type {IWAQIApiResponse}
   * @memberof IWAQIApiResponseRepo
   * @property {IWAQIApiResponse}
   * @property {IWAQIApiResponse}
   * @property {IWAQIApiResponse}
   */
  // Crud methods
  GetAll(): IApiResponse[];
  GetByStatus(status: string): IApiResponse[];
  GetById(id: string): IApiResponse;
  add(apiResponse: IApiResponse): void;
  Update(apiResponse: IApiResponse): void;
  Delete(id: string): void;
}
