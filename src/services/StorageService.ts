import StorageDto from '@/dtos/StorageDto';
import { BaseEntityService } from './BaseEntityService';

export class StorageService extends BaseEntityService<StorageDto> {
  constructor() {
    super('v1/Storages');
  }
}