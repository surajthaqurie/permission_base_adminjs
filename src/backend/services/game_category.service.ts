import { IGameByCategory, IGameCategory } from "../../interfaces";
import { prisma, paginated_query } from "../../utility";
const { gameCategory: GameCategory } = prisma;

const getGameCategories = async (page: number, itemNo: number): Promise<IGameCategory[]> => {
  const pagination_query = paginated_query(page, itemNo);

  const game_categories = await GameCategory.findMany({
    ...pagination_query
  });

  return game_categories;
};

const getGamesByCategory = async (slug: string, page: number, itemNo: number): Promise<IGameByCategory[]> => {
  const pagination_query = paginated_query(page, itemNo);
  const games = await GameCategory.findMany({
    ...pagination_query,
    where: {
      slug
    },
    select: {
      name: true,
      GameByCategory: {
        select: {
          Game: true
        }
      }
    }
  });

  return games;
};

export const game_category_service = {
  getGameCategories,
  getGamesByCategory
};
