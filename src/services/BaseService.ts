import axios, { AxiosInstance } from 'axios';

export abstract class BaseService {
  private static hostBaseUrl = 'http://localhost:5232/api/';

  protected axios: AxiosInstance;

  constructor(baseUrl: string) {

    this.axios = axios.create(
      {
        baseURL: BaseService.hostBaseUrl + baseUrl,
        headers: {
          common: {
            'Content-Type': 'application/json'
          }
        }
      }
    );

    this.axios.interceptors.request.use(request => {
      // console.log('Starting Request', JSON.stringify(request, null, 2));
      return request;
    });

  }
}