import {
  GoogleGenerativeAI,
  GenerativeModel,
  GenerateContentResponse,
} from "@google/generative-ai";

interface AIServiceInterface {
  sendPrompt(prompt: string): Promise<string>;
}

export default class GeminiService implements AIServiceInterface {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(apiKey: string, modelName: string = "gemini-1.5-flash") {
    if (!apiKey) throw new Error("API Key is required.");
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: modelName });
  }

  async sendPrompt(prompt: string): Promise<string> {
    if (!prompt.trim()) throw new Error("Prompt cannot be empty.");

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error("Error while generating content:", error);
      throw error;
    }
  }
}

export class AIServiceFactory {
  static createService(type: "gemini", apiKey: string): AIServiceInterface {
    switch (type) {
      case "gemini":
        return new GeminiService(apiKey);
      default:
        throw new Error(`Unknown AI service type: ${type}`);
    }
  }
}
