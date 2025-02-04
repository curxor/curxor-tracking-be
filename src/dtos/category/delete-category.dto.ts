import { Types } from "mongoose";
import { IUser } from "../../models/user.model";

export interface deleteCategoryDto {
  _id: string;
  user: IUser;
}
