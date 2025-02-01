import { model, Schema } from "mongoose";
export interface IUser {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  balance: number;
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true },
    avatar: { type: String },
    balance: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
