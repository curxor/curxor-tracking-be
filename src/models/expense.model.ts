import { model, Schema } from "mongoose";
export interface IExpense {
  _id: Schema.Types.ObjectId;
  description: string;
  name: string;
  icon: string;
  type: string;
  amount: number;
  user: Schema.Types.ObjectId;
}
const expenseSchema = new Schema<IExpense>(
  {
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String, required: true, default: "❓" },
    type: { type: String, required: true },
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

export const Expense = model<IExpense>("Expense", expenseSchema);
