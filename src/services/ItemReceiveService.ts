import ItemReceiveDTO from '@/dtos/itemReceive.dto';
import BaseEntityService from './BaseEntityService';
import { UserContextType } from '@/UserContext';
import ResultObject from '@/interfaces/ResultObject';
import { AxiosError } from 'axios';
import AccountService from './AccountService';

export default class ItemReceiveService extends BaseEntityService<ItemReceiveDTO> {
  constructor() {
    super('v1/Items');
  }

  async getAll(userContext: UserContextType, query = '', limit?: number): Promise<ResultObject<ItemReceiveDTO[]>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.get<ItemReceiveDTO[]>(`?query=${query}&limit=${limit ?? ''}`, {
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

          const response = await this.axios.get<ItemReceiveDTO[]>(`?query=${query}&limit=${limit ?? ''}`, {
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