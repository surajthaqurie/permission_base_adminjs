import { IPage } from "../../interfaces";
import { prisma, paginated_query, pageDetailsCustomResponse } from "../../utility";

const { pages: Pages } = prisma;

const getPages = async (page: number, itemNo: number): Promise<IPage[]> => {
  const pagination_query = paginated_query(page, itemNo);

  const pages = await Pages.findMany({
    ...pagination_query
  });

  return pages;
};

const getPageDetailsBySlug = async (slug: string): Promise<IPage | null> => {
  const page_details = await Pages.findFirst({
    where: { slug }
  });

  const page_details_custom_response = pageDetailsCustomResponse(page_details);
  return page_details_custom_response;
};

export const page_service = {
  getPages,
  getPageDetailsBySlug
};
