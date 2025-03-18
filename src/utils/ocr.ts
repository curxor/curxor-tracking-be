import createHttpError from "http-errors";
import fs from "fs";
import path from "path";
const Tesseract = require("tesseract.js");

export const ocr = async (file: Express.Multer.File): Promise<string> => {
  try {
    const filePath = path.join(file.destination, file.filename);
    const data = await Tesseract.recognize(filePath, "vie");
    fs.unlinkSync(filePath);
    return data.data.text;
  } catch (error) {
    console.log(error);
    throw createHttpError(500, "Error while processing image");
  }
};
