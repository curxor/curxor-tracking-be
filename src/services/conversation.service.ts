import { sendMessageDto } from "../dtos/conversation/send-message.dto";
import {
  Conversation,
  IConversation,
  Message,
} from "../models/conversation.model";
import { IUser } from "../models/user.model";
import { AIServiceFactory } from "./gemini.service";
import { Transaction } from "../models/transaction.model";
import { ITransaction } from "../interfaces/transaction";
import ExpenseService from "./category.service";
import { getConversationBotDto } from "../dtos/conversation/get-conversation-bot.dto";
import { convertToObjectId } from "../utils/objectId";
import { ConversationData } from "../types/conversation.type";
import { ocr } from "../utils/ocr";

export default class ConversationService {
  static async startConversation(user: IUser): Promise<void> {
    const conversation = await Conversation.findOne({ user: user._id });
    if (!conversation) await Conversation.create({ user: user });
    return;
  }
  static async getConversationBot(
    getConversationBotDto: getConversationBotDto
  ): Promise<IConversation> {
    const { botId, userId } = getConversationBotDto;
    const conversation = await Conversation.findOne({
      bot: botId,
      user: userId,
    });
    if (!conversation) {
      return await Conversation.create({ bot: botId, user: userId });
    }
    return conversation;
  }
  static async getMessages(
    user: IUser,
    bot: string
  ): Promise<ConversationData> {
    const conversation = await this.getConversationBot({
      userId: user._id,
      botId: convertToObjectId(bot),
    });
    console.log(conversation);
    const messages = await Message.find({
      conversation: conversation._id,
    })
      .populate({ path: "user" })
      .populate({ path: "transaction" })
      .sort({ createdAt: -1 });
    return { messages, conversation: conversation._id };
  }
  static async sendMessage(sendMessageDto: sendMessageDto): Promise<any> {
    const { text, user, conversationId, botId, file } = sendMessageDto;
    const [categories, apiKey] = await Promise.all([
      ExpenseService.getCategories(user),
      process.env.GEMINI_API_KEY || "",
    ]);
    let imageText = "";
    if (!text && file) {
      imageText = await ocr(file);
    }
    const geminiService = AIServiceFactory.createService("gemini", apiKey);
    const PROMPT = `${process.env.CHAT_PROMPT} [Main Input :  ${
      text || imageText
    }] - [expense: ${JSON.stringify(categories, null, 2)}]`;
    console.log(PROMPT);
    const response = await geminiService.sendPrompt(PROMPT);
    let parsedResponse;
    parsedResponse = JSON.parse(response.replace(/```json|```/g, "").trim());

    const transactions = parsedResponse.main?.length
      ? await Transaction.insertMany(
          parsedResponse.main.map((item: ITransaction) => ({ ...item, user }))
        )
      : [];
    console.log(parsedResponse);
    const messages = [
      {
        text: text || imageText,
        conversation: convertToObjectId(conversationId),
        user,
      },
      {
        text: parsedResponse.text,
        conversation: convertToObjectId(conversationId),
        transaction: transactions.map((t) => t._id),
        user: botId,
      },
    ];

    await Message.insertMany(messages);
    return { ...parsedResponse, transactions };
  }
}
