import StorageDTO from '@/dtos/storage.dto';
import { BaseEntityService } from './BaseEntityService';

export class StorageService extends BaseEntityService<StorageDTO> {
  constructor() {
    super('v1/Storages');
  }
}