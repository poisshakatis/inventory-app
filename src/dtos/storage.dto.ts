import BaseEntity from '@/interfaces/BaseEntity';

export default interface StorageDTO extends BaseEntity {
  name: string;
  parentStorageId?: string;
  parentStorageName?: string;
}