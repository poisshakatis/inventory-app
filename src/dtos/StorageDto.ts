import BaseEntity from '@/interfaces/BaseEntity';

export default interface StorageDto extends BaseEntity {
  name: string;
  parentStorageId?: string;
  parentStorageName?: string;
}