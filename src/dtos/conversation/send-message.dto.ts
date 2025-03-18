import { IUser } from "../../models/user.model";

export interface sendMessageDto {
  user: IUser;
  text: string;
  conversationId: string;
  botId: String;
  file: Express.Multer.File;
}
