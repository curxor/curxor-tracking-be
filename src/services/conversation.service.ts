import { sendMessageDto } from "../dtos/conversation/send-message.dto";
import {
  Conversation,
  IConversation,
  IMessage,
  Message,
} from "../models/conversation.model";
import { IUser } from "../models/user.model";
import { AIServiceFactory } from "./gemini.service";
import { ITransaction, Transaction } from "../models/transaction.model";
import ExpenseService from "./expense.service";
import { getConversationBotDto } from "../dtos/conversation/get-conversation-bot.dto";
import { convertToObjectId } from "../utils/objectId";
import { ConversationData } from "../types/conversation.type";

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
    const { text, user, conversationId, botId } = sendMessageDto;
    const expense = await ExpenseService.getExpense(user);
    const apiKey = process.env.GEMINI_API_KEY || "";
    const geminiService = AIServiceFactory.createService("gemini", apiKey);
    const PROMPT = `${process.env.CHAT_PROMPT}${text} - [expense: ${expense}]`;
    const response = await geminiService.sendPrompt(PROMPT);
    const cleanedResponse = response.replace(/```json|```/g, "").trim();
    const parsedResponse = JSON.parse(cleanedResponse);
    const transactions = parsedResponse.main?.length
      ? await Transaction.insertMany(
          parsedResponse.main.map((item: ITransaction) => ({
            ...item,
            user,
          }))
        )
      : [];
    const messages = [
      { text, conversation: convertToObjectId(conversationId), user },
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
