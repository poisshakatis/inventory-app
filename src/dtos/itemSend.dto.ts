import BaseItemDTO from './baseItem.dto';

export default interface ItemSendDTO extends BaseItemDTO {
  image: File;
}