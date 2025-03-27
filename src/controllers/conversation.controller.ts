// import { Response } from "express";
// import { AuthRequest } from "../interfaces/request";
// import ConversationService from "../services/conversation.service";
// export default class ConversationController {
//   static startConversation = async (req: AuthRequest, res: Response) => {
//     await ConversationService.startConversation(req.user);
//     return res.json({ message: "ok", status: 200 });
//   };
//   static getMessages = async (req: AuthRequest, res: Response) => {
//     const rs = await ConversationService.getMessages(req.user, req.body.botId);
//     return res.json({ message: "ok", status: 200, data: rs });
//   };
//   static sendMessage = async (req: AuthRequest, res: Response) => {
//     const rs = await ConversationService.sendMessage({
//       user: req.user,
//       ...req.body,
//       file: req.file,
//     });
//     return res.json({ message: "ok", status: 200, data: rs });
//   };
// }
import { Response } from "express";
import { AuthRequest } from "../interfaces/request";
import ConversationService from "../services/conversation.service";

export default class ConversationController {
  // Bắt đầu hội thoại
  static startConversation = async (req: AuthRequest, res: Response) => {
    await ConversationService.startConversation(req.user);
    return res.json({ message: "ok", status: 200 });
  };

  // Lấy tin nhắn
  static getMessages = async (req: AuthRequest, res: Response) => {
    const rs = await ConversationService.getMessages(req.user, req.body.botId);
    return res.json({ message: "ok", status: 200, data: rs });
  };

  // Gửi tin nhắn
  static sendMessage = async (req: AuthRequest, res: Response) => {
    console.log("File uploaded:", req.file); // Kiểm tra log để xác định file đã được nhận chưa

    const rs = await ConversationService.sendMessage({
      user: req.user,
      ...req.body,
      file: req.file, // Truyền file vào service
    });
    return res.json({ message: "ok", status: 200, data: rs });
  };
}
