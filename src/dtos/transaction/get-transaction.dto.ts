import { IUser } from "../../models/user.model";

export interface getTransactionDto {
  user: IUser;
  limit: number;
  page: number;
  search: string | undefined;
}
export interface getTransactionRepoDto {
  limit: number;
  page: number;
  query: any;
}
