import { DMMFClass, prisma } from "../utility";
import { settingValidation } from "../frontend/validations";
import { admin_seo_resource, delete_guard } from "./helper.resources";

const setting_resource = {
  resource: {
    model: ((prisma as any)._baseDmmf as DMMFClass).modelMap.Settings,
    client: prisma
  },
  options: {
    parent: null,
    actions: {
      show: admin_seo_resource,
      list: admin_seo_resource,
      new: {
        ...admin_seo_resource,
        before: [settingValidation]
      },
      edit: {
        ...admin_seo_resource,
        before: [settingValidation]
      },
      delete: { ...delete_guard, ...admin_seo_resource }
    },
    filterProperties: ["key"]
  }
};

export default setting_resource;
