import { Schema } from "mongoose";
import { IUser } from "../../models/user.model";

export interface enterExpenseDto {
  user: IUser;
  description: string;
  amount: number;
  expense: Schema.Types.ObjectId;
}
