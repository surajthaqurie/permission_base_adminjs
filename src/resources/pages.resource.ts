import { Components } from "../frontend/components";
import { pageResponseMessage, pageValidation } from "../frontend/validations";
import { imageName, prismaSaveNullDataToUndefined, slugify } from "../hooks";
import { DMMFClass, prisma } from "../utility";
import { admin_seo_resource, delete_guard, image_properties, image_validation, localProvider, og_types } from "./helper.resources";
import uploadFeature from "@adminjs/upload";

const { resourcePermission: ResourcePermission } = prisma;

const model = ((prisma as any)._baseDmmf as DMMFClass).modelMap.Pages;

const page_resource = {
  resource: {
    model,
    client: prisma
  },
  options: {
    parent: null,
    actions: {
      new: {
        isAccessible: async ({ currentAdmin, resource, record }: any) => {
          const response_data = await ResourcePermission.findFirst({
            where: {
              user_id: currentAdmin.id,
              resource_name: model.name.toUpperCase()
            }
          });

          return response_data && response_data.write === true;
        },
        before: [pageValidation, slugify],
        after: [pageResponseMessage]
      },
      edit: {
        isAccessible: async ({ currentAdmin, resource, record }: any) => {
          const response_data = await ResourcePermission.findFirst({
            where: {
              user_id: currentAdmin.id,
              resource_name: model.name.toUpperCase()
            }
          });

          return response_data && response_data.update === true;
        },
        before: [pageValidation, slugify, prismaSaveNullDataToUndefined],
        after: [imageName]
      },
      show: {
        // isAccessible: async ({ currentAdmin, resource, record }: any) => {
        //   let response_data = await ResourcePermission.findFirst({
        //     where: {
        //       user_id: currentAdmin.id,
        //       resource_name: model.name.toUpperCase()
        //     }
        //   });
        //   if (!response_data) {
        //     return !!response_data;
        //   } else {
        //     return response_data.read;
        //   }
        // }
      },
      list: {
        isAccessible: ({ currentAdmin, resource, record }: any) => {
          const promise = new Promise(async (resolve, reject) => {
            const is_accessible = await ResourcePermission.findFirst({
              where: {
                user_id: currentAdmin.id,
                resource_name: model.name.toUpperCase()
              }
            });
            if (is_accessible) resolve(is_accessible.read);
          });

          Promise.all([promise]).then((value) => value);
        }
      },
      delete: {
        ...delete_guard
        // isAccessible: async ({ currentAdmin, resource, record }: any) => {
        //   let response_data = await ResourcePermission.findFirst({
        //     where: {
        //       user_id: currentAdmin.id,
        //       resource_name: model.name.toUpperCase()
        //     }
        //   });

        //   if (!response_data) {
        //     return !!response_data;
        //   } else {
        //     return response_data.delete;
        //   }
        // }
      }
    },
    filterProperties: ["name"],
    properties: {
      description: {
        components: {
          edit: Components.TextEditor,
          show: Components.ShowTextEditor
        },
        isVisible: {
          list: false,
          edit: true,
          show: true
        }
      },
      og_type: og_types,
      slug: {
        isVisible: false,
        isAccessible: false
      },
      sections: {
        type: "mixed",
        isArray: true
      },
      "sections.title": {
        type: "string"
      },
      "sections.description": {
        components: {
          edit: Components.TextEditor,
          show: Components.ShowTextEditor
        }
      },
      meta_box: {
        type: "mixed",
        isArray: true
      },
      "meta_box.key": {
        type: "string"
      },
      "meta_box.value": {
        type: "string"
      },
      image_alternative_text: {
        isRequired: true
      }
    }
  },
  features: [
    uploadFeature({
      provider: { local: localProvider },
      validation: image_validation,
      properties: image_properties,
      uploadPath: (record: any, filename: string) => `/pages/${record.id()}~~${filename}`
    })
  ]
};

export default page_resource;
