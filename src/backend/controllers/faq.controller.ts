import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { faq_service } from "../services";
import { ICommonResponse, IFaq } from "../../interfaces";

const getFAQs = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IFaq[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const faqs = await faq_service.getFAQs(page, itemNo);

  return res.json({
    success: true,
    data: faqs
  });
};

const getFAQByCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IFaq[]>> => {
  const faqCategoryId = req.params.id;

  const faq = await faq_service.getFAQByCategoryId(faqCategoryId);

  return res.json({
    success: true,
    data: faq
  });
};

export const faq_controller = {
  getFAQs: catchAsync(getFAQs),
  getFAQByCategoryId: catchAsync(getFAQByCategoryId)
};
