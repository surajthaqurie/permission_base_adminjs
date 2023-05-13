import { NextFunction, Request, Response } from "express";
import { user_service } from "../services";
import { ICommonResponse, IUser } from "../../interfaces";
import { changePasswordValidation } from "../validations";
import AppError from "../../utility/AppError";
import catchAsync from "../../utility/catchAsync";

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IUser[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const users = await user_service.getUsers(page, itemNo);

  return res.json({
    success: true,
    data: users
  });
};

const changePassword = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  const userId = req.params.id;
  const { error, value } = changePasswordValidation(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  if (value.new_password !== value.confirm_password) {
    return next(new AppError("New password and confirm password doesn't matched !!", 400));
  }

  const user = await user_service.changePassword(userId, value.new_password);
  if (!user) {
    return next(new AppError("User record not found, Unable to change password !!", 404));
  }

  return res.json({
    success: true,
    data: user
  });
};
export const user_controller = {
  getUsers: catchAsync(getUsers),
  changePassword: catchAsync(changePassword)
};
