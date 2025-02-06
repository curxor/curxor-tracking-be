import { IUser } from "../../models/user.model";

export interface createCategoryDto {
  user: IUser;
  description: string;
  name: string;
  icon: string;
  type: string;
}
