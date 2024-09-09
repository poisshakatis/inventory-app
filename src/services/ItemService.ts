import ItemDTO from '@/dtos/item.dto';
import { BaseEntityService } from './BaseEntityService';

export class ItemService extends BaseEntityService<ItemDTO> {
  constructor() {
    super('v1/Items');
  }
}