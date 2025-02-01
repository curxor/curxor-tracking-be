import { model, Schema } from "mongoose";
interface IUser {
  name: string;
  email: string;
  avatar?: string;
  balance: string;
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
