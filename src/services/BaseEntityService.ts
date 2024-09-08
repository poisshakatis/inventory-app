import { BaseService } from './BaseService';
import { UserContextType } from '@/UserContext';
import AccountService from './AccountService';
import { AxiosError } from 'axios';
import BaseEntity from '@/interfaces/BaseEntity';
import ResultObject from '@/interfaces/ResultObject';

export abstract class BaseEntityService<
  TEntity extends BaseEntity
> extends BaseService {
  constructor(
    baseUrl: string
  ) {
    super(baseUrl);
  }

  async getAll(userContext: UserContextType): Promise<ResultObject<TEntity[]>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.get<TEntity[]>('', {
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

          const response = await this.axios.get<TEntity[]>('', {
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

  async find(id: string, userContext: UserContextType): Promise<ResultObject<TEntity>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.get<TEntity>(id, {
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

          const response = await this.axios.get<TEntity>(id, {
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

  async add(data: TEntity, userContext: UserContextType): Promise<ResultObject<TEntity>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.post<TEntity>('', data, {
        headers: {
          Authorization: 'Bearer ' + user!.jwt,
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

          const response = await this.axios.post<TEntity>('', data, {
            headers: {
              Authorization: 'Bearer ' + userResponse.data.jwt,
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

  async update(id: string, data: TEntity, userContext: UserContextType): Promise<ResultObject<TEntity>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.put(id, data, {
        headers: {
          Authorization: 'Bearer ' + user!.jwt,
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
            },
          });
        }
      }

      return {
        errors: [JSON.stringify(error)]
      };
    }
  }

  async remove(id: string, userContext: UserContextType): Promise<ResultObject<TEntity>> {
    const { user, setUser } = userContext;
    try {
      const response = await this.axios.delete(id, {
        headers: {
          Authorization: 'Bearer ' + user!.jwt,
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

          await this.axios.delete(id, {
            headers: {
              Authorization: 'Bearer ' + userResponse.data.jwt,
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