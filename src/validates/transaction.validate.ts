import * as yup from "yup";

export const transactionSchema = yup.object().shape({
  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters")
    .max(200, "Description must be less than 200 characters"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount must be greater than or equal to 0"),
  category: yup.string().required("Category is required"),
});
