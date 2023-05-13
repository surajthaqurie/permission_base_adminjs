import { NextFunction, Request, Response } from "express";
import AppError from "../../utility/AppError";
import catchAsync from "../../utility/catchAsync";
import { page_service } from "../services";
import { ICommonResponse, IPage } from "../../interfaces";

const getPages = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IPage[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const pages = await page_service.getPages(page, itemNo);

  return res.json({
    success: true,
    data: pages
  });
};

const getPageDetailsBySlug = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const slug = req.params.slug;

  const page_details = await page_service.getPageDetailsBySlug(slug);
  if (!page_details) {
    return next(new AppError("Page record not found", 404));
  }

  return res.json({
    success: true,
    data: page_details
  });
};

export const page_controller = {
  getPages: catchAsync(getPages),
  getPageDetailsBySlug: catchAsync(getPageDetailsBySlug)
};
