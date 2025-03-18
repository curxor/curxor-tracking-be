import { Types } from "mongoose";
import { IUser } from "../../models/user.model";

export interface editCategoryDto {
  user: IUser;
  _id: string;
  description: string;
  name: string;
  icon: string;
  amount?: number;
  type: string;
}
