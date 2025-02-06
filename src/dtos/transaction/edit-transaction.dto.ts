import { IUser } from "../../models/user.model";

export interface editTransactionDto {
  user: IUser;
  _id: string;
  description: string;
  amount: number;
  category: string;
}
