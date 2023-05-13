import { IGameType } from "../../interfaces";
import { prisma, paginated_query } from "../../utility";

const { gameTypes: Game_Types } = prisma;

const getGameTypes = async (page: number, itemNo: number): Promise<IGameType[]> => {
  const pagination_query = paginated_query(page, itemNo);
  const game_types = await Game_Types.findMany({
    ...pagination_query
  });

  return game_types;
};

const getGameTypeDetailsBySlug = async (slug: string): Promise<IGameType | null> => {
  const game_type_details = await Game_Types.findFirst({
    where: { slug }
  });

  return game_type_details;
};

export const game_type_service = {
  getGameTypes,
  getGameTypeDetailsBySlug
};
