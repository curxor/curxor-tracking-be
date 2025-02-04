import { IUser } from "../../models/user.model";

export interface createExpenseDto {
  user: IUser;
  description: string;
  name: string;
  icon: string;
  amount: number;
  type: string;
}
