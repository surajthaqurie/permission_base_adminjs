import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { game_category_service } from "../services";
import { ICommonResponse, IGameByCategory, IGameCategory } from "../../interfaces";

const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IGameCategory[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const game_categories = await game_category_service.getGameCategories(page, itemNo);
  return res.json({
    success: true,
    data: game_categories
  });
};

const getGamesByCategory = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IGameByCategory[]>> => {
  let slug: string = req.params.slug as string;
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const games = await game_category_service.getGamesByCategory(slug, page, itemNo);
  return res.json({
    success: true,
    data: games
  });
};

export const game_category_controller = {
  getCategories: catchAsync(getCategories),
  getGamesByCategory: catchAsync(getGamesByCategory)
};
