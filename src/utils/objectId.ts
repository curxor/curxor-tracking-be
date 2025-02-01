import { Schema } from "mongoose";

export const convertToObjectId = (id: string) => {
  return new Schema.Types.ObjectId(id);
};
