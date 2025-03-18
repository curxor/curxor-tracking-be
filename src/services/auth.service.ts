import { generateOTP } from "../utils/otp";
import EmailService from "./email.service";
import UserService from "./user.service";
import RedisService from "../databases/redis";
import { hash, compare } from "../utils/bcrypt";
import { signToken } from "../utils/jwt";
import createHttpError from "http-errors";
const OTP_KEY = "otp-";
export default class AuthService {
  static async signIn(email: string): Promise<void> {
    //#region Điều kiện kiểm tra unit test
    if (!email) throw createHttpError(400, "Email is required");

    // Kiểm tra định dạng email bằng regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw createHttpError(400, "Invalid email address");
    }
    //#endregion
    await UserService.findUserByEmailOrCreate(email);
    const otp = generateOTP();
    EmailService.sendEmail({
      text: `Your OTP:${otp}`,
      to: email,
      subject: "[Curxor Tracking] - Verify Sign In",
    });
    await RedisService.set(OTP_KEY + email, await hash(otp));
  }
  static async verifySignIn({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }): Promise<String> {
    // Kiểm tra OTP trong Redis
    const userOtp = await RedisService.get(OTP_KEY + email);
    if (!userOtp) throw createHttpError("Invalid OTP");
    if (!(await compare(otp, userOtp))) {
      throw createHttpError("Invalid OTP");
    }
    await RedisService.remove(OTP_KEY + email);
    // Kiểm tra User đã tồn tại
    const user = await UserService.findUserByEmail(email);
    return signToken(user._id.toString(), email);
  }
}
// static async verifySignIn({
//   email,
//   otp,
// }: {
//   email: string;
//   otp: string;
// }): Promise<string> {
//   const userOtp = await RedisService.get(OTP_KEY + email);
//   if (!userOtp) throw createHttpError("Invalid OTP");
//   if (!(await compare(otp, userOtp))) {
//     throw createHttpError("Invalid OTP");
//   }
//   await RedisService.remove(OTP_KEY + email);

//   const user = await UserService.findUserByEmail(email);
//   if (!user) throw createHttpError("User not found"); // Thêm kiểm tra này

//   return signToken(user._id.toString(), email);
// }
