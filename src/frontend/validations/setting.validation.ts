import { ActionContext, ActionRequest, ValidationError } from "adminjs";
import { isEmptyString } from "./validation.helper";
import { ISettingForm } from "../../interfaces";

export const settingValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const errors: Partial<ISettingForm> = {};

    if (isEmptyString(payload.key)) {
      errors.key = {
        message: "Key is required"
      };
    }

    if (isEmptyString(payload.value)) {
      errors.value = {
        message: "Value is required"
      };
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};
