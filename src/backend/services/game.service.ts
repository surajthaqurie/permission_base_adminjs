import { IGame } from "../../interfaces";
import { prisma, paginated_query } from "../../utility";

const { games: Games } = prisma;

const getGames = async (page: number, itemNo: number, game_type: string): Promise<IGame[]> => {
  const where_query = {
    GameTypes: {
      slug: {
        equals: game_type,
        mode: "insensitive"
      }
    }
  };

  const query = game_type ? where_query : {};
  const pagination_query = paginated_query(page, itemNo);

  const games = await Games.findMany({
    ...pagination_query,
    where: query,
    include: {
      GameTypes: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          orders: true,
          slug: true
        }
      }
    }
  });

  return games;
};

const getGameDetailsBySlug = async (slug: string): Promise<IGame | null> => {
  const game_details = await Games.findFirst({
    where: {
      slug
    },
    include: {
      GameTypes: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          orders: true,
          slug: true
        }
      }
    }
  });

  return game_details;
};

export const game_service = {
  getGames,
  getGameDetailsBySlug
};
