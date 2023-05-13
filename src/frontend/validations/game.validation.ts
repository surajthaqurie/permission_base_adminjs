import { ActionContext, ActionRequest, ValidationError } from "adminjs";
import { isEmptyString } from "./validation.helper";
import { IGameForm } from "../../interfaces";

export const gameValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const errors: Partial<IGameForm> = {};

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

    if (isEmptyString(payload.gallery_alternative_text)) {
      errors.gallery_alternative_text = {
        message: "Gallery alternative text is required"
      };
    }

    if (isEmptyString(payload.description)) {
      errors.description = {
        message: "Description is required"
      };
    }

    if (isEmptyString(payload.GameTypes)) {
      errors.GameTypes = {
        message: "Game Types is required"
      };
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};
