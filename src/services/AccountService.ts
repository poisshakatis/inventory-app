import { User } from '@/UserContext';
import ResultObject from '@/interfaces/ResultObject';
import TokenRefreshInfo from '@/dtos/tokenRefresh.dto';
import RegisterInfo from '@/dtos/register.dto';
import LoginInfo from '@/dtos/login.dto';
import BaseService from './BaseService';

export default class AccountService extends BaseService {
  constructor() {
    super('v1/identity/account/');
  }

  async login(data: LoginInfo): Promise<ResultObject<User>> {
    try {
      const response = await this.axios.post<User>('login', data);
            
      if (response.status === 200) {
        return {
          data: response.data
        };
      }
      return {
        errors: [response.status.toString() + ' ' + response.statusText]
      };
    } catch (error) {
      return {
        errors: [JSON.stringify(error)]
      };
    }
  }

  async register(data: RegisterInfo): Promise<ResultObject<User>> {
    try {
      const response = await this.axios.post<User>('register', data);
            
      if (response.status === 200) {
        return {
          data: response.data
        };
      }
      return {
        errors: [response.status.toString() + ' ' + response.statusText]
      };
    } catch (error) {
      return {
        errors: [JSON.stringify(error)]
      };
    }
  }

  async refreshToken(data: TokenRefreshInfo): Promise<ResultObject<User>> {
    try {
      const response = await this.axios.post<User>('refreshTokenData', data);
            
      if (response.status === 200) {
        return {
          data: response.data
        };
      }
      return {
        errors: [response.status.toString() + ' ' + response.statusText]
      };
    } catch (error) {
      return {
        errors: [JSON.stringify(error)]
      };
    }
  }
}