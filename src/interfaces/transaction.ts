import { Types } from "mongoose";

export interface ITransaction {
  description: string;
  amount: number;
  category: Types.ObjectId;
  user: Types.ObjectId;
}
