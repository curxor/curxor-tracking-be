import { model, Schema } from "mongoose";
export interface ITransaction {
  description: string;
  amount: number;
  expense: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}
const transactionSchema = new Schema<ITransaction>(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    expense: { type: Schema.Types.ObjectId, ref: "Expense" },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
