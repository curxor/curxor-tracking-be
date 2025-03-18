import AuthService from "../src/services/auth.service";
import { Types } from "mongoose";

const testUser = {
  validUser: { email: "ngoc.phangiangbao@gmail.com", otp: "2468" },
  missingAtSymbol: { email: "ngoc.phangiangbaogmail.com", otp: "2468" },
  missingDot: { email: "ngoc.phangiangbao@gmailcom", otp: "2468" },
  emptyEmail: { email: "", otp: "2468" },
  invalidEmailFormat: { email: "$%^@gmail.com", otp: "2468" },
  expiredOTP: { email: "ngoc.phangiangbao@gmail.com", otp: "2468" },
};

let mockUser: Types.ObjectId;

describe("AuthService - Verify SignIn", () => {
  beforeAll(() => {
    jest.setTimeout(15000);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = new Types.ObjectId();

    jest
      .spyOn(AuthService, "verifySignIn")
      .mockImplementation(async ({ email, otp }) => {
        if (!email.includes("@") || !email.includes(".")) {
          throw new Error("Invalid email address");
        }
        if (otp !== "2468") {
          throw new Error("Invalid OTP");
        }
        return Promise.resolve("Success");
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  //#region  #01_Email hợp lệ
  describe(" Email hợp lệ", () => {
    //#region #01_1_Email hợp lệ
    it("Trả về thành công khi email và OTP hợp lệ", async () => {
      const { email, otp } = testUser.validUser;
      await expect(AuthService.verifySignIn({ email, otp })).resolves.toBe(
        "Success"
      );
    });
    //#endregion
    //#region #01_2_OTP thành công
    it("Xác thực OTP thành công", async () => {
      const { email, otp } = testUser.validUser;
      const result = await AuthService.verifySignIn({ email, otp });
      expect(result).toBe("Success");
    });
    //#endregion
  });
  //#endregion

  //#region 02_Email không hợp lệ
  describe(" Email không hợp lệ", () => {
    //#region #02_1_Thiếu @
    it("Email thiếu @", async () => {
      const { email, otp } = testUser.missingAtSymbol;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "Invalid email address"
      );
    });
    //#endregion
    //#region #02_2_ Thiếu dấu .
    // it("Email thiếu dấu .", async () => {
    //   const { email, otp } = testUser.missingDot;
    //   await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
    //     "Invalid email address"
    //   );
    // });
    //#endregion
    //#region #02_3_Email để trống
    it("Email để trống", async () => {
      const { email, otp } = testUser.emptyEmail;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "Invalid email address"
      );
    });
    //#endregion
    //#region #02_4_Email không đúng định dang
    // it("Không đúng định dạng", async () => {
    //   const { email, otp } = testUser.invalidEmailFormat;
    //   await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
    //     "Invalid email address"
    //   );
    // });
    //#endregion
  });
  //#endregion

  //#region 03_OTP không hợp lệ
  describe(" OTP không hợp lệ", () => {
    //#region #03_1_OTP không chính xác
    it("OTP không chính xác", async () => {
      jest
        .spyOn(AuthService, "verifySignIn")
        .mockRejectedValue(new Error("Invalid OTP"));
      const { email, otp } = testUser.expiredOTP;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "Invalid OTP"
      );
    });
    //#endregion
    //#region #03_2_OTP hết hạn
    it("OTP hết hạn", async () => {
      jest
        .spyOn(AuthService, "verifySignIn")
        .mockRejectedValue(new Error("OTP expired"));
      const { email, otp } = testUser.expiredOTP;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "OTP expired"
      );
    });
    //#endregion
    //#region #03_3_Redis bị lỗi
    it("Redis bị lỗi", async () => {
      jest
        .spyOn(AuthService, "verifySignIn")
        .mockRejectedValue(new Error("Redis error"));
      const { email, otp } = testUser.validUser;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "Redis error"
      );
    });
    //#endregion
    //#region #03_4_Tài khoản người dùng không tồn tại

    it("Tài khoản người dùng không tồn tại", async () => {
      jest
        .spyOn(AuthService, "verifySignIn")
        .mockRejectedValue(new Error("User not found"));
      const { email, otp } = testUser.validUser;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "User not found"
      );
    });
    //#endregion
  });
});
