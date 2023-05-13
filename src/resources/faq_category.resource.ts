import { DMMFClass, prisma } from "../utility";
import { faqCategoryValidation } from "../frontend/validations";
import { admin_editor_resource, delete_guard, image_properties, image_validation, localProvider } from "./helper.resources";
import { imageName } from "../hooks";
import { Components } from "../frontend/components";
import uploadFeature from "@adminjs/upload";

const faq_category_resource = {
  resource: {
    model: ((prisma as any)._baseDmmf as DMMFClass).modelMap.FAQCategory,
    client: prisma
  },
  options: {
    parent: null,
    actions: {
      new: {
        before: [faqCategoryValidation]
      },
      edit: {
        before: [faqCategoryValidation],
        after: [imageName]
      },
      delete: { ...delete_guard }
    },
    filterProperties: ["title"],
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
      uploadPath: (record: any, filename: string) => `/faq_category/${record.id()}~~${filename}`
    })
  ]
};

export default faq_category_resource;
