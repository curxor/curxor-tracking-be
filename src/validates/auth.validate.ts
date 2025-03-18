import { verify } from "jsonwebtoken";
import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

export const verifySchema = yup.object().shape({
  email: yup.number().required("OTP is required"),
});
