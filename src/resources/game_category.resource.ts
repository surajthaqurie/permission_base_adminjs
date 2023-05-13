import { gameCategoryValidation } from "../frontend/validations";
import { slugify } from "../hooks";
import { DMMFClass, prisma } from "../utility";
import { admin_seo_resource, delete_guard } from "./helper.resources";

const game_category_resource = {
  resource: {
    model: ((prisma as any)._baseDmmf as DMMFClass).modelMap.GameCategory,
    client: prisma
  },
  options: {
    parent: null,
    actions: {
      show: admin_seo_resource,
      list: admin_seo_resource,
      new: {
        ...admin_seo_resource,
        before: [gameCategoryValidation, slugify]
      },
      edit: {
        ...admin_seo_resource,
        before: [gameCategoryValidation, slugify]
      },
      delete: { ...delete_guard, ...admin_seo_resource }
    },
    filterProperties: ["name"],
    properties: {
      slug: {
        isVisible: false,
        isAccessible: false
      }
    }
  }
};

export default game_category_resource;
