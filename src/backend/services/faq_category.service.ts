import { IFaqCategory } from "../../interfaces";
import { prisma, paginated_query } from "../../utility";
const { fAQCategory: FAQCategory } = prisma;

const getFAQCategories = async (page: number, itemNo: number): Promise<IFaqCategory[]> => {
  const pagination_query = paginated_query(page, itemNo);

  const faq_categories = await FAQCategory.findMany({ ...pagination_query });

  return faq_categories;
};

export const faq_category_service = {
  getFAQCategories
};
