import { ActionContext, ActionRequest, ValidationError } from "adminjs";
import { isEmptyString } from "./validation.helper";
import { IFaqCategoryForm } from "../../interfaces";

export const faqCategoryValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;

  if (payload && method === "post") {
    const errors: Partial<IFaqCategoryForm> = {};

    if (isEmptyString(payload.title)) {
      errors.title = {
        message: "Title is required"
      };
    }

    if (isEmptyString(payload.image_alternative_text)) {
      errors.image_alternative_text = {
        message: "Image alternative text is required"
      };
    }

    if (isEmptyString(payload.description)) {
      errors.description = {
        message: "Description is required"
      };
    }
    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};
