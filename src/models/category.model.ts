import { model, Schema, Types } from "mongoose";
import { CATEGORY_TYPE } from "../constant/category-type";
export interface ICategory {
  _id: Types.ObjectId;
  description: string;
  name: string;
  icon: string;
  type: string;
  amount: number;
  user: Types.ObjectId;
}
const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String, required: true, default: "❓" },
    type: { type: String, required: true, enum: { ...CATEGORY_TYPE } },
    amount: { type: Number, default: 0 },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model<ICategory>("Category", categorySchema);
