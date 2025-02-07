import { model, Schema } from "mongoose";
export interface TransactionDocument extends Document {
  updateOne: (update: Partial<TransactionDocument>) => Promise<void>;
  deleteOne: () => Promise<void>;
  description: string;
  amount: number;
  category: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

const transactionSchema = new Schema<TransactionDocument>(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<TransactionDocument>(
  "Transaction",
  transactionSchema
);
