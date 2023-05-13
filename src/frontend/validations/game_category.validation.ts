import { ActionContext, ActionRequest, ValidationError } from "adminjs";
import { isEmptyString } from "./validation.helper";
import { IGameCategoryForm } from "../../interfaces";

export const gameCategoryValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const errors: Partial<IGameCategoryForm> = {};

    if (isEmptyString(payload.name)) {
      errors.name = {
        message: "Name is required"
      };
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};
