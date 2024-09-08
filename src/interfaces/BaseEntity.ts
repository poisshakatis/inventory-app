export default interface BaseEntity {
  id?: string;
  [key: string]: string | number | undefined;
}