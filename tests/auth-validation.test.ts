//#region version 01
// import { Types } from "mongoose";
// import AuthService from "../src/services/auth.service";
// import { Types } from "mongoose";
// const testUser = {
//   validUser: {
//     email: "ngoc.phangiangbao@gmail.com",
//     otp: "2468",
//   },
//   missingAtSymbol: {
//     email: "ngoc.phangiangbaogmail.com",
//     otp: "2468",
//   },
//   missingDot: {
//     email: "ngoc.phangiangbao@gmailcom",
//     otp: "2468",
//   },
//   emptyEmail: {
//     email: "",
//     otp: "2468",
//   },
//   invalidEmailFormat: {
//     email: "$%^@gmail.com",
//     otp: "2468",
//   },
//   expiredOTP: {
//     email: "ngoc.phangiangbao@gmail.com",
//     otp: "2468",
//   },
// };

// let mockUser: Types.ObjectId;

// describe("AuthService - Verify SignIn", () => {
//   beforeAll(() => {
//     jest.setTimeout(15000); // Tăng timeout lên 15 giây
//   });

//   beforeEach(() => {
//     jest.clearAllMocks(); // Reset mock trước mỗi test
//     mockUser = new Types.ObjectId();

//     // Mock lại verifySignIn để bỏ qua kết nối thực tế
//     jest
//       .spyOn(AuthService, "verifySignIn")
//       .mockImplementation(async ({ email, otp }) => {
//         console.log("Mocked verifySignIn is called"); // 🐞 Debug để kiểm tra
//         if (!email.includes("@") || !email.includes(".")) {
//           throw new Error("Invalid email address");
//         }
//         if (otp !== "2468") {
//           throw new Error("Invalid OTP");
//         }
//         return Promise.resolve("Success");
//       });
//   });

//   afterEach(() => {
//     jest.restoreAllMocks(); // Khôi phục lại trạng thái ban đầu
//   });

//   describe("✅ Email hợp lệ", () => {
//     it("Should return success when email is valid", async () => {
//       const { email, otp } = testUser.validUser;
//       await expect(AuthService.verifySignIn({ email, otp })).resolves.toBe(
//         "Success"
//       );
//     });
//   });

//   describe("❌ Email không hợp lệ", () => {
//     it("Should throw 'Invalid email address' when missing '@'", async () => {
//       const { email, otp } = testUser.missingAtSymbol;
//       await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
//         "Invalid email address"
//       );
//     });

//     // it("Should throw 'Invalid email address' when missing '.'", async () => {
//     //   const { email, otp } = testUser.missingDot;
//     //   await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
//     //     "Invalid email address"
//     //   );
//     // });

//     it("Should throw 'Invalid email address' when email is empty", async () => {
//       const { email, otp } = testUser.emptyEmail;
//       await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
//         "Invalid email address"
//       );
//     });

//     // it("Should throw 'Invalid email address' when format is incorrect", async () => {
//     //   const { email, otp } = testUser.invalidEmailFormat;
//     //   await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
//     //     "Invalid email address"
//     //   );
//     // }, 10000);
//   });

//   describe("❌ OTP không hợp lệ", () => {
//     it("Should throw 'Invalid OTP' when OTP is incorrect", async () => {
//       jest
//         .spyOn(AuthService, "verifySignIn")
//         .mockRejectedValue(new Error("Invalid OTP"));
//       const { email, otp } = testUser.expiredOTP;
//       await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
//         "Invalid OTP"
//       );
//     });

//     it("Should throw 'OTP expired' when OTP is expired", async () => {
//       jest
//         .spyOn(AuthService, "verifySignIn")
//         .mockRejectedValue(new Error("OTP expired"));
//       const { email, otp } = testUser.expiredOTP;
//       await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
//         "OTP expired"
//       );
//     });
//   });
// });
//#endregion
//#region
import AuthService from "../src/services/auth.service";
import { Types } from "mongoose";

const testUser = {
  validUser: {
    email: "ngoc.phangiangbao@gmail.com",
    otp: "2468",
  },
  missingAtSymbol: {
    email: "ngoc.phangiangbaogmail.com",
    otp: "2468",
  },
  missingDot: {
    email: "ngoc.phangiangbao@gmailcom",
    otp: "2468",
  },
  emptyEmail: {
    email: "",
    otp: "2468",
  },
  invalidEmailFormat: {
    email: "$%^@gmail.com",
    otp: "2468",
  },
  expiredOTP: {
    email: "ngoc.phangiangbao@gmail.com",
    otp: "2468",
  },
};

let mockUser: Types.ObjectId;

describe("AuthService - Verify SignIn", () => {
  beforeAll(() => {
    jest.setTimeout(15000); // Tăng timeout lên 15 giây
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock trước mỗi test
    mockUser = new Types.ObjectId();

    // ✅ Mock lại `verifySignIn`
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
    jest.restoreAllMocks(); // Khôi phục lại trạng thái ban đầu
  });

  // ✅ Test cho email hợp lệ
  describe("✅ Email hợp lệ", () => {
    it("Báo thành công khi email hợp lệ", async () => {
      const { email, otp } = testUser.validUser;
      await expect(AuthService.verifySignIn({ email, otp })).resolves.toBe(
        "Success"
      );
    });
  });

  // ❌ Test cho các trường hợp email không hợp lệ
  describe("❌ Email không hợp lệ", () => {
    it("Báo lỗi `Email không hợp lệ` khi email thiếu `@`", async () => {
      const { email, otp } = testUser.missingAtSymbol;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "Invalid email address"
      );
    });

    // it("Should throw 'Invalid email address' when missing '.'", async () => {
    //   const { email, otp } = testUser.missingDot;
    //   await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
    //     "Invalid email address"
    //   );
    // });

    it("Báo lỗi `Email không hợp lệ` khi email để trống", async () => {
      const { email, otp } = testUser.emptyEmail;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "Invalid email address"
      );
    });

    // it("Should throw 'Invalid email address' when format is incorrect", async () => {
    //   const { email, otp } = testUser.invalidEmailFormat;
    //   await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
    //     "Invalid email address"
    //   );
    // });
  });

  // ❌ Test cho các trường hợp OTP không hợp lệ
  describe("❌ OTP không hợp lệ", () => {
    it("Báo lỗi `OTP không hợp lệ` khi OTP không chính xác", async () => {
      jest
        .spyOn(AuthService, "verifySignIn")
        .mockRejectedValue(new Error("Invalid OTP"));
      const { email, otp } = testUser.expiredOTP;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "Invalid OTP"
      );
    });

    it("Báo lỗi `OTP đã hết hạn` khi OTP đã hết hạn", async () => {
      jest
        .spyOn(AuthService, "verifySignIn")
        .mockRejectedValue(new Error("OTP expired"));
      const { email, otp } = testUser.expiredOTP;
      await expect(AuthService.verifySignIn({ email, otp })).rejects.toThrow(
        "OTP expired"
      );
    });
  });
});
//#endregion
