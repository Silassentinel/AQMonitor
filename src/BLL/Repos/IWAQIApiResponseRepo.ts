/**
 * Repo containing the response from the IWAQI API
 */

import IApiResponse from '../Models/Interfaces/WAQI/IApiResponse';

export default interface IWAQIApiResponseRepo {
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
  Create(apiResponse: IApiResponse): IApiResponse;
  Update(apiResponse: IApiResponse): IApiResponse;
  Delete(id: string): IApiResponse;
}
