import { AppError } from "adminjs";

export const ERR = {
  DUBLICATE_EMAIL: new AppError("Email already used. Please use different email")
};
