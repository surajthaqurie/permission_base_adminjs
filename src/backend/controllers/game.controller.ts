import { NextFunction, Request, Response } from "express";
import { game_service } from "../services";
import { ICommonResponse, IGame } from "../../interfaces";
import AppError from "../../utility/AppError";
import catchAsync from "../../utility/catchAsync";

const getGames = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IGame[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);
  let game_type: string = req.query.game_type as string;

  const games = await game_service.getGames(page, itemNo, game_type);

  return res.json({
    success: true,
    data: games
  });
};

const getGameDetailsBySlug = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const slug = req.params.slug;

  const game_details = await game_service.getGameDetailsBySlug(slug);

  if (!game_details) {
    return next(new AppError("Game record not found", 404));
  }

  return res.json({
    success: true,
    data: game_details
  });
};

export const game_controller = {
  getGames: catchAsync(getGames),
  getGameDetailsBySlug: catchAsync(getGameDetailsBySlug)
};
