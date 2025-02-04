import { Types } from "mongoose";
import { IMessage } from "../models/conversation.model";

export interface ConversationData {
  messages: IMessage[];
  conversation: Types.ObjectId;
}
