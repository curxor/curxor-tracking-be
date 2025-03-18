import { Response } from "express";
import { AuthRequest } from "../interfaces/request";
import ConversationService from "../services/conversation.service";
export default class ConversationController {
  static startConversation = async (req: AuthRequest, res: Response) => {
    await ConversationService.startConversation(req.user);
    return res.json({ message: "ok", status: 200 });
  };
  static getMessages = async (req: AuthRequest, res: Response) => {
    const rs = await ConversationService.getMessages(req.user, req.body.botId);
    return res.json({ message: "ok", status: 200, data: rs });
  };
  static sendMessage = async (req: AuthRequest, res: Response) => {
    const rs = await ConversationService.sendMessage({
      user: req.user,
      ...req.body,
      file: req.file,
    });
    return res.json({ message: "ok", status: 200, data: rs });
  };
}
