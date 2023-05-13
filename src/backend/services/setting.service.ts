import { ISetting } from "../../interfaces";
import { prisma, paginated_query, settingCustomResponse } from "../../utility";

const { settings: Settings } = prisma;

const getSettings = async (page: number, itemNo: number): Promise<ISetting[]> => {
  const pagination_query = paginated_query(page, itemNo);

  const settings = await Settings.findMany({
    ...pagination_query
  });

  const customResponse = settingCustomResponse(settings);
  return customResponse;
};

const getSettingsDetails = async (key: string): Promise<ISetting | null> => {
  const setting_details = await Settings.findFirst({
    where: {
      key: {
        equals: key,
        mode: "insensitive"
      }
    }
  });

  return setting_details;
};

export const setting_service = {
  getSettings,
  getSettingsDetails
};
