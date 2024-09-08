import { UserContextType } from '@/UserContext';
import { BaseService } from './BaseService';
import UserItemCountDto from '@/dtos/UserItemCountDto';
import ResultObject from '@/interfaces/ResultObject';
import { AxiosError } from 'axios';
import AccountService from './AccountService';

export class AdminStatsService extends BaseService {
  constructor() {
    super('v1/AdminStats');
  }

  async getUsersWithItemCount(userContext: UserContextType): Promise<ResultObject<UserItemCountDto[]>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.get<UserItemCountDto[]>('', {
        headers: {
          Authorization: 'Bearer ' + user!.jwt,
        },
      });

      if (response.status === 200) {
        return {
          data: response.data
        };
      }

      return {
        errors: [response.status.toString() + ' ' + response.statusText]
      };
    } catch (error) {
      if (user && (error as AxiosError).response?.status === 401) {
        const userResponse = await new AccountService().refreshToken({
          jwt: user.jwt,
          refreshToken: user.refreshToken
        });
        if (userResponse.data) {
          setUser(userResponse.data);

          const response = await this.axios.get<UserItemCountDto[]>('', {
            headers: {
              Authorization: 'Bearer ' + userResponse.data.jwt,
            },
          });

          if (response.status === 200) {
            return {
              data: response.data
            };
          }
        }
      }

      return {
        errors: [JSON.stringify(error)]
      };
    }
  }
}