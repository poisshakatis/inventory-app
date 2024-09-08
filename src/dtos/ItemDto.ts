import BaseEntity from '@/interfaces/BaseEntity';

export default interface ItemDto extends BaseEntity {
  name: string;
  image: string;
  serialNumber?: string;
  description: string;
  category: string;
  quantity: number;
  storageId: string;
  storageName: string;
}