// import AuthService from "../src/services/auth.service";
// import UserService from "../src/services/user.service";
// import EmailService from "../src/services/email.service";
// import RedisService from "../src/databases/redis";
// import { hash, compare } from "../src/utils/bcrypt";
// import { testUser } from "../src/mocks/auth.mock";

// jest.mock("../src/services/user.service");
// jest.mock("../src/services/email.service");
// jest.mock("../src/databases/redis");
// jest.mock("../src/utils/bcrypt");

// describe("AuthService - Integration Test", () => {
//   beforeAll(async () => {
//     await RedisService.getInstance().connect();
//   });

//   afterAll(async () => {
//     await RedisService.getInstance().disconnect();
//   });

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("Should sign in and store OTP in Redis", async () => {
//     (UserService.findUserByEmailOrCreate as jest.Mock).mockResolvedValue(
//       testUser.validUser
//     );
//     (hash as jest.Mock).mockResolvedValue("hashedOTP");
//     (RedisService.set as jest.Mock).mockResolvedValue(true);

//     await AuthService.signIn(testUser.validUser.email);

//     expect(RedisService.set).toHaveBeenCalledWith(
//       `otp-${testUser.validUser.email}`,
//       "hashedOTP"
//     );
//   });

//   it("Should send OTP via Email", async () => {
//     (UserService.findUserByEmailOrCreate as jest.Mock).mockResolvedValue(
//       testUser.validUser
//     );
//     const sendEmailSpy = jest.spyOn(EmailService, "sendEmail");

//     await AuthService.signIn(testUser.validUser.email);

//     expect(sendEmailSpy).toHaveBeenCalledWith({
//       text: expect.stringContaining("Your OTP:"),
//       to: testUser.validUser.email,
//       subject: "[Curxor Tracking] - Verify Sign In",
//     });
//   });

//   it("Should verify OTP and return JWT token", async () => {
//     (RedisService.get as jest.Mock).mockResolvedValue("hashedOTP");
//     (compare as jest.Mock).mockResolvedValue(true);
//     (UserService.findUserByEmail as jest.Mock).mockResolvedValue(
//       testUser.validUser
//     );

//     const token = await AuthService.verifySignIn({
//       email: testUser.validUser.email,
//       otp: testUser.validUser.otp,
//     });

//     expect(token).toBeTruthy();
//     expect(typeof token).toBe("string");
//     expect(RedisService.remove).toHaveBeenCalledWith(
//       `otp-${testUser.validUser.email}`
//     );
//   });

//   it("Should fail when OTP is incorrect", async () => {
//     (RedisService.get as jest.Mock).mockResolvedValue("hashedOTP");
//     (compare as jest.Mock).mockResolvedValue(false);

//     await expect(
//       AuthService.verifySignIn({
//         email: testUser.validUser.email,
//         otp: "9999",
//       })
//     ).rejects.toThrow("Invalid OTP");
//   });
// });
