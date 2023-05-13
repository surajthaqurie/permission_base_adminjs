import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import AppError from "../../utility/AppError";
import { generateSecretKey, generateQRcodeURL, twoFAVerify } from "../../utility";
import { twoFAValidation, twoFAVerifyValidation } from "../validations";
import { two_fa_service, user_service } from "../services";

const setupTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { error, value } = twoFAValidation(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const user = await user_service.getUserById(value.userId);
  if (!user) {
    return next(new AppError("User record not found !!", 404));
  }

  value.secret = generateSecretKey();
  const qr_code_url = await generateQRcodeURL(value.secret);
  if (!qr_code_url) {
    return next(new AppError(`Unable to generate QR code url !!`, 400));
  }

  const two_factor_auth = await two_fa_service.setupTwoFA(value);
  if (!two_factor_auth) {
    return next(new AppError(`Unable to setup two factor authentication !!`, 400));
  }

  return res.json({
    success: true,
    data: { ...two_factor_auth, qr_code_url }
  });
};

const verifyTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { error, value } = twoFAVerifyValidation(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const auth_user = await two_fa_service.verifyTwoFA(value.userId);
  if (!auth_user) {
    return next(new AppError("User record not found !!", 404));
  }

  const is_valid = twoFAVerify(value.twoFAToken, auth_user.secret);
  if (!is_valid) {
    return next(new AppError("The given token is not valid !!", 400));
  }

  return res.json({
    success: true
  });
};

const enableTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { error, value } = twoFAVerifyValidation(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const auth_user = await two_fa_service.verifyTwoFA(value.userId);
  if (!auth_user) {
    return next(new AppError("User record not found !!", 404));
  }

  const is_valid = twoFAVerify(value.twoFAToken, auth_user.secret);
  if (!is_valid) {
    return next(new AppError("The given token is not valid !!", 400));
  }

  const enable_two_fa = await two_fa_service.enableTwoFA(auth_user.id);
  if (!enable_two_fa) {
    return next(new AppError("Unable to enable Two FA", 400));
  }

  return res.json({
    success: true,
    data: enable_two_fa
  });
};

const getTwoFAStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const userId = req.params.id;

  const two_fa_status = await two_fa_service.getTwoFAStatus(userId);

  if (!two_fa_status) {
    return res.json({
      success: false
    });
  }

  return res.json({
    success: true
  });
};

const disableTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { error, value } = twoFAValidation(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const two_fa_status = await two_fa_service.getTwoFAStatus(value.userId);
  if (!two_fa_status) {
    return next(new AppError("User records not found for disable two fa !!", 404));
  }

  const disable_two_fa = await two_fa_service.disableTwoFA(two_fa_status.id);
  if (!disable_two_fa) {
    return next(new AppError("Unable to disable 2FA !!", 400));
  }

  return res.json({
    success: true,
    data: disable_two_fa
  });
};

export const two_fa_controller = {
  setupTwoFA: catchAsync(setupTwoFA),
  enableTwoFA: catchAsync(enableTwoFA),
  getTwoFAStatus: catchAsync(getTwoFAStatus),
  disableTwoFA: catchAsync(disableTwoFA),
  verifyTwoFA: catchAsync(verifyTwoFA)
};
