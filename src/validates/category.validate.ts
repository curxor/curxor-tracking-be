import * as yup from "yup";
import { CATEGORY_TYPE } from "../constants/category-type";

export const createCategorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  description: yup
    .string()
    .max(200, "Description must be less than 200 characters")
    .required("Description is required"),
  icon: yup.string().required("Icon is required"),
  type: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .required("Type is required")
    .oneOf(Object.values(CATEGORY_TYPE), "Type is required"),
  amount: yup.number().min(0, "Amount must be greater than or equal to 0"),
});
// findCategory
export const findCategorySchema = yup.object().shape({
  _id: yup.string().required(" ID is required"),
  user: yup.object().shape({
    _id: yup.string().required("User ID is required"),
  }),
});
