import axios, { AxiosInstance } from 'axios';

export default abstract class BaseService {
  private static hostBaseUrl = 'http://localhost:5232/api/';

  protected axios: AxiosInstance;

  constructor(baseUrl: string) {
    this.axios = axios.create({
      baseURL: BaseService.hostBaseUrl + baseUrl,
    });
  }
}