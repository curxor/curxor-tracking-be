import AuthService from "../src/services/auth.service";
import UserService from "../src/services/user.service";
import EmailService from "../src/services/email.service";
import RedisService from "../src/databases/redis";
import { hash, compare } from "../src/utils/bcrypt";
import { signToken } from "../src/utils/jwt";
import bodyParser from "body-parser";
import express from "express";
const app = express();
app.use(bodyParser.json());
// Định nghĩa route nhu trong server thật
jest.mock("../src/services/user.service");
jest.mock("../src/services/email.service");
jest.mock("../src/databases/redis");
jest.mock("../src/utils/bcrypt");
jest.mock("../src/utils/jwt");
describe("Đăng nhập email bằng OTP", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock trước mỗi test
  });

  //#endregion: Gửi OTP thành công khi nhập email hợp lệ
  it("Gửi OTP thành công khi nhập email hợp lệ", async () => {
    // Giả lập tìm thấy user hoặc tạo mới
    (UserService.findUserByEmailOrCreate as jest.Mock).mockResolvedValue(
      undefined
    );
    // Mock hàm gửi email
    (EmailService.sendEmail as jest.Mock).mockResolvedValue(undefined);
    // Mock Redis lưu OTP
    (RedisService.set as jest.Mock).mockResolvedValue(undefined);
    // Mock bcrypt hash
    (hash as jest.Mock).mockResolvedValue("hashed-otp");

    await AuthService.signIn("test@example.com");

    expect(UserService.findUserByEmailOrCreate).toHaveBeenCalledWith(
      "test@example.com"
    );
    expect(EmailService.sendEmail).toHaveBeenCalledWith({
      text: expect.stringContaining("Your OTP:"),
      to: "test@example.com",
      subject: "[Curxor Tracking] - Verify Sign In",
    });
    expect(RedisService.set).toHaveBeenCalledWith(
      "otp-test@example.com",
      "hashed-otp"
    );
  });
  //#endregion

  //#region: Xác thực OTP thành công
  it("Xác thực OTP thành công", async () => {
    (RedisService.get as jest.Mock).mockResolvedValue("hashed-otp");
    (compare as jest.Mock).mockResolvedValue(true); // OTP đúng
    (UserService.findUserByEmail as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "test@example.com",
    });
    (signToken as jest.Mock).mockReturnValue("mocked-token");

    const token = await AuthService.verifySignIn({
      email: "test@example.com",
      otp: "123456",
    });

    expect(RedisService.get).toHaveBeenCalledWith("otp-test@example.com");
    expect(compare).toHaveBeenCalledWith("123456", "hashed-otp");
    expect(UserService.findUserByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
    expect(signToken).toHaveBeenCalledWith("123", "test@example.com");
    expect(token).toBe("mocked-token");
  });
  //#endregion
  //#region Xác thực OTP thất bại khi OTP sai
  it(" Xác thực OTP thất bại khi OTP sai", async () => {
    (RedisService.get as jest.Mock).mockResolvedValue("hashed-otp");
    (compare as jest.Mock).mockResolvedValue(false); // OTP sai

    await expect(
      AuthService.verifySignIn({ email: "test@example.com", otp: "000000" })
    ).rejects.toThrow("Invalid OTP");

    expect(RedisService.get).toHaveBeenCalledWith("otp-test@example.com");
    expect(compare).toHaveBeenCalledWith("000000", "hashed-otp");
  });
  //#endregion
  //#region Xác thực OTP thất bại khi OTP hết hạn
  it(" Xác thực OTP thất bại khi OTP hết hạn", async () => {
    (RedisService.get as jest.Mock).mockResolvedValue(null); // OTP không tồn tại

    await expect(
      AuthService.verifySignIn({ email: "test@example.com", otp: "123456" })
    ).rejects.toThrow("Invalid OTP");

    expect(RedisService.get).toHaveBeenCalledWith("otp-test@example.com");
  });
  //#endregion
});
