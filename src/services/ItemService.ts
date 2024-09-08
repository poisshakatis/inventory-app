import ItemDto from '@/dtos/ItemDto';
import { BaseEntityService } from './BaseEntityService';

export class ItemService extends BaseEntityService<ItemDto> {
  constructor() {
    super('v1/Items');
  }
}