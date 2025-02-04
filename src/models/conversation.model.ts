import { model, Schema, Types } from "mongoose";
export interface IConversation {
  _id: Types.ObjectId;
  bot: Types.ObjectId;
  user: Types.ObjectId;
}
const conversationSchema = new Schema<IConversation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bot: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export interface IMessage {
  _id: Schema.Types.ObjectId;
  text: string;
  conversation: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  transaction: Schema.Types.ObjectId;
}
const messageSchema = new Schema<IMessage>(
  {
    text: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    transaction: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Conversation = model<IConversation>(
  "Conversation",
  conversationSchema
);
export const Message = model<IMessage>("Message", messageSchema);
