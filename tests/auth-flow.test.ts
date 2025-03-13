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

  //#region 01: Gửi OTP thành công khi nhập email hợp lệ
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

    await AuthService.signIn("ngoc@gmail.com");

    expect(UserService.findUserByEmailOrCreate).toHaveBeenCalledWith(
      "ngoc@gmail.com"
    );
    expect(EmailService.sendEmail).toHaveBeenCalledWith({
      text: expect.stringContaining("Your OTP:"),
      to: "ngoc@gmail.com",
      subject: "[Curxor Tracking] - Verify Sign In",
    });
    expect(RedisService.set).toHaveBeenCalledWith(
      "otp-ngoc@gmail.com",
      "hashed-otp"
    );
  });
  //#endregion
  //#region 02: Xác thực OTP thành công
  it("Xác thực OTP thành công", async () => {
    (RedisService.get as jest.Mock).mockResolvedValue("hashed-otp");
    (compare as jest.Mock).mockResolvedValue(true); // OTP đúng
    (UserService.findUserByEmail as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "ngoc@gmail.com",
    });
    (signToken as jest.Mock).mockReturnValue("mocked-token");

    const token = await AuthService.verifySignIn({
      email: "ngoc@gmail.com",
      otp: "2468",
    });

    expect(RedisService.get).toHaveBeenCalledWith("otp-ngoc@gmail.com");
    expect(compare).toHaveBeenCalledWith("2468", "hashed-otp");
    expect(UserService.findUserByEmail).toHaveBeenCalledWith("ngoc@gmail.com");
    expect(signToken).toHaveBeenCalledWith("123", "ngoc@gmail.com");
    expect(token).toBe("mocked-token");
  });
  //#endregion
  //#region 03: Xác thực OTP thất bại khi OTP sai
  it(" Xác thực OTP thất bại khi OTP sai", async () => {
    (RedisService.get as jest.Mock).mockResolvedValue("hashed-otp");
    (compare as jest.Mock).mockResolvedValue(false); // OTP sai

    await expect(
      AuthService.verifySignIn({ email: "ngoc@gmail.com", otp: "0000" })
    ).rejects.toThrow("Invalid OTP");

    expect(RedisService.get).toHaveBeenCalledWith("otp-ngoc@gmail.com");
    expect(compare).toHaveBeenCalledWith("0000", "hashed-otp");
  });
  //#endregion
  //#region 04: Xác thực OTP thất bại khi OTP hết hạn
  it(" Xác thực OTP thất bại khi OTP hết hạn", async () => {
    (RedisService.get as jest.Mock).mockResolvedValue(null); // OTP không tồn tại

    await expect(
      AuthService.verifySignIn({ email: "ngoc@gmail.com", otp: "2468" })
    ).rejects.toThrow("Invalid OTP");

    expect(RedisService.get).toHaveBeenCalledWith("otp-ngoc@gmail.com");
  });
  //#endregion
  //#region 05: Gửi OTP thất bại khi có lỗi từ Redis
  it("Gửi OTP thất bại khi có lỗi từ Redis", async () => {
    (UserService.findUserByEmailOrCreate as jest.Mock).mockResolvedValue(
      undefined
    );
    (EmailService.sendEmail as jest.Mock).mockResolvedValue(undefined);
    (RedisService.set as jest.Mock).mockRejectedValue(new Error("Redis error"));

    await expect(AuthService.signIn("ngoc@gmail.com")).rejects.toThrow(
      "Redis error"
    );

    expect(UserService.findUserByEmailOrCreate).toHaveBeenCalledWith(
      "ngoc@gmail.com"
    );
    expect(EmailService.sendEmail).toHaveBeenCalled();
    expect(RedisService.set).toHaveBeenCalled();
  });
  //#endregion
  //#region 06: Xác thực OTP thất bại khi Redis bị lỗi
  it("Xác thực OTP thất bại khi Redis gặp lỗi", async () => {
    (RedisService.get as jest.Mock).mockRejectedValue(new Error("Redis error"));

    await expect(
      AuthService.verifySignIn({ email: "ngoc@gmail.com", otp: "2468" })
    ).rejects.toThrow("Redis error");

    expect(RedisService.get).toHaveBeenCalledWith("otp-ngoc@gmail.com");
  });
  //#endregion
  //#region 07: Xác thực OTP thất bại khi user không tồn tại
  // it("Xác thực OTP thất bại khi user không tồn tại", async () => {
  //   (RedisService.get as jest.Mock).mockResolvedValue("hashed-otp");
  //   (compare as jest.Mock).mockResolvedValue(true); // OTP đúng
  //   (UserService.findUserByEmail as jest.Mock).mockResolvedValue(null);

  //   await expect(
  //     AuthService.verifySignIn({ email: "nguyen@gmail.com", otp: "2468" })
  //   ).rejects.toThrow("User not found");

  //   expect(RedisService.get).toHaveBeenCalledWith("otp-nguyen@gmail.com");
  //   expect(compare).toHaveBeenCalledWith("2468", "hashed-otp");
  //   expect(UserService.findUserByEmail).toHaveBeenCalledWith(
  //     "nguyen@gmail.com"
  //   );
  // });
  //#endregion
});
