import { ValidationError, ActionResponse, ActionRequest, ActionContext } from "adminjs";
import { isEmptyString } from "./validation.helper";
import { IPageForm } from "../../interfaces";

export const pageValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const errors: Partial<IPageForm> = {};

    if (isEmptyString(payload.name)) {
      errors.name = {
        message: "Name is required"
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

export const pageResponseMessage = (originalResponse: ActionResponse, request: ActionRequest, context: ActionContext): ActionResponse => {
  originalResponse.notice = {
    message: "Successfully created a new page",
    type: "success"
  };
  return originalResponse;
};
