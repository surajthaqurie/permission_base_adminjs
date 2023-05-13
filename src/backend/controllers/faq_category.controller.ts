import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { ICommonResponse, IFaqCategory } from "../../interfaces";
import { faq_category_service } from "../services";

const getFAQCategories = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IFaqCategory[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const faq_categories = await faq_category_service.getFAQCategories(page, itemNo);
  return res.json({
    success: true,
    data: faq_categories
  });
};

export const faq_category_controller = {
  getFAQCategories: catchAsync(getFAQCategories)
};
