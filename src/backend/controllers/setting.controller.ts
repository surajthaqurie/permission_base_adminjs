import { NextFunction, Request, Response } from "express";
import AppError from "../../utility/AppError";
import catchAsync from "../../utility/catchAsync";
import { setting_service } from "../services";
import { ICommonResponse, ISetting } from "../../interfaces";

const getSettings = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<ISetting[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const settings = await setting_service.getSettings(page, itemNo);
  return res.json({
    success: true,
    data: settings
  });
};

const getSettingsDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let key: string = req.params.key;

  const setting_details = await setting_service.getSettingsDetails(key);
  if (!setting_details) {
    return next(new AppError("Setting record not found !!", 404));
  }

  return res.json({
    success: true,
    data: setting_details
  });
};

export const setting_controller = {
  getSettings: catchAsync(getSettings),
  getSettingsDetails: catchAsync(getSettingsDetails)
};
