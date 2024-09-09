import Category from '@/constants/Category';

export default interface UserStatisticsDTO {
  email: string;
  categoryItemCount: Map<Category, number>;
}