import { IUser } from "../../models/user.model";

export interface getProfileDto {
  user: IUser;
  startDate: string;
  endDate: string;
}
