import bcrypt from "bcrypt";

export const hash = async (value: string) => {
  return await bcrypt.hash(value, 10);
};
export const compare = async (data: string, encrypted: string) => {
  return await bcrypt.compare(data, encrypted);
};
