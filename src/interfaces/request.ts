// import { Request } from "express";
// import { IUser } from "../models/user.model";

// export interface AuthRequest extends Request {
//   user: IUser;
// }
import { Request } from "express";
import { IUser } from "../models/user.model";

export interface AuthRequest extends Request {
  user: IUser;
  file?: Express.Multer.File; // Thêm kiểu cho file từ multer
}
