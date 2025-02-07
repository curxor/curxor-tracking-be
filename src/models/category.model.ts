import { model, Schema, Types } from "mongoose";
import { CATEGORY_TYPE } from "../constants/category-type";
export interface CategoryDocument extends Document {
  _id: Types.ObjectId;
  description: string;
  name: string;
  icon: string;
  type: string;
  amount: number;
  user: Types.ObjectId;
  updateOne: (update: Partial<CategoryDocument>) => Promise<void>;
  deleteOne: () => Promise<void>;
}
const categorySchema = new Schema<CategoryDocument>(
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

export const Category = model<CategoryDocument>("Category", categorySchema);
