import { IFaq } from "../../interfaces";
import { prisma, paginated_query } from "../../utility";
const { fAQ: FAQ } = prisma;

const getFAQs = async (page: number, itemNo: number): Promise<IFaq[]> => {
  const pagination_query = paginated_query(page, itemNo);
  const faqs = await FAQ.findMany({
    ...pagination_query,
    include: {
      FAQCategory: true
    }
  });

  return faqs;
};

const getFAQByCategoryId = async (faqCategoryId: string): Promise<IFaq[]> => {
  const faq = await FAQ.findMany({
    where: {
      FAQCategoryId: faqCategoryId
    },
    include: {
      FAQCategory: true
    }
  });

  return faq;
};

export const faq_service = {
  getFAQs,
  getFAQByCategoryId
};
