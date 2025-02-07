import { Types } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  description: string;
  name: string;
  icon: string;
  type: string;
  amount: number;
  user: Types.ObjectId;
}
