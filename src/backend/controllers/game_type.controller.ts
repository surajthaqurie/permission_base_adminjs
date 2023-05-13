import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { game_type_service } from "../services";
import AppError from "../../utility/AppError";
import { ICommonResponse, IGameType } from "../../interfaces";

const getGameTypes = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IGameType[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const game_types = await game_type_service.getGameTypes(page, itemNo);

  return res.status(200).json({
    success: true,
    data: game_types
  });
};

const getGameTypeDetailsBySlug = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const slug = req.params.slug;

  const game_type_details = await game_type_service.getGameTypeDetailsBySlug(slug);
  if (!game_type_details) {
    return next(new AppError("Game type record not found", 404));
  }

  return res.json({
    success: true,
    data: game_type_details
  });
};

export const game_type_controller = {
  getGameTypes: catchAsync(getGameTypes),
  getGameTypeDetailsBySlug: catchAsync(getGameTypeDetailsBySlug)
};
