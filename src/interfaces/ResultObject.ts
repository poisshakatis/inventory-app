export default interface ResultObject<TResponseData> {
  errors?: string[];
  data?: TResponseData;
}