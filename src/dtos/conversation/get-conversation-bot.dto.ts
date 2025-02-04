import { Types } from "mongoose";

export interface getConversationBotDto {
  botId: Types.ObjectId;
  userId: Types.ObjectId;
}
