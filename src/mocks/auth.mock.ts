export const testUser = {
  validUser: {
    _id: "user123",
    email: "ngoc.phangiangbao@gmail.com",
    otp: "2468",
  },
  missingAtSymbol: { email: "ngoc.phangiangbaogmail.com", otp: "2468" },
  missingDot: { email: "ngoc.phangiangbao@gmailcom", otp: "2468" },
  emptyEmail: { email: "", otp: "2468" },
  invalidEmailFormat: { email: "$%^@gmail.com", otp: "2468" },
  expiredOTP: {
    _id: "user123",
    email: "ngoc.phangiangbao@gmail.com",
    otp: "2468",
  },
};
