import BaseEntity from '@/interfaces/BaseEntity';

export default interface BaseItemDTO extends BaseEntity {
  name: string;
  serialNumber?: string;
  description: string;
  category: string;
  quantity: number;
  storageId: string;
  storageName: string;
}