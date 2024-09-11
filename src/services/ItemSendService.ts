import ItemSendDTO from '@/dtos/itemSend.dto';
import BaseEntityService from './BaseEntityService';
import { UserContextType } from '@/UserContext';
import ResultObject from '@/interfaces/ResultObject';
import { AxiosError } from 'axios';
import AccountService from './AccountService';

export default class ItemSendService extends BaseEntityService<ItemSendDTO> {
  constructor() {
    super('v1/Items');
  }
  
  async add(data: ItemSendDTO, userContext: UserContextType): Promise<ResultObject<ItemSendDTO>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.post<ItemSendDTO>('', data, {
        headers: {
          Authorization: 'Bearer ' + user!.jwt,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 201) {
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

          const response = await this.axios.post<ItemSendDTO>('', data, {
            headers: {
              Authorization: 'Bearer ' + userResponse.data.jwt,
              'Content-Type': 'multipart/form-data'
            },
          });

          if (response.status === 201) {
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

  async update(id: string, data: ItemSendDTO, userContext: UserContextType): Promise<ResultObject<ItemSendDTO>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.put(id, data, {
        headers: {
          Authorization: 'Bearer ' + user!.jwt,
          'Content-Type': 'multipart/form-data'
        },
      });

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

          await this.axios.put(id, data, {
            headers: {
              Authorization: 'Bearer ' + userResponse.data.jwt,
              'Content-Type': 'multipart/form-data'
            },
          });
        }
      }

      return {
        errors: [JSON.stringify(error)]
      };
    }
  }
}