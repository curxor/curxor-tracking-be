import createHttpError from "http-errors";
import { JwtPayload, sign, verify } from "jsonwebtoken";
export const signToken = (_id: string, email: string) => {
  const payload = {
    _id,
    email,
  };
  return sign(payload, process.env.ACCESS_KEY, { expiresIn: "15d" });
};
export const verifyToken = (token: string) => {
  try {
    return verify(token, process.env.ACCESS_KEY) as JwtPayload;
  } catch (error) {
    throw createHttpError.Unauthorized("Unauthorized");
  }
};
