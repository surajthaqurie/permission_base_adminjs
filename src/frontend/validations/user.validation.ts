import { ValidationError, ActionRequest, ActionContext } from "adminjs";
import { findUniqueFieldError, isEmailValid, isEmptyString, isPasswordValid } from "./validation.helper";
import { IUserForm } from "../../interfaces";
import { prisma } from "../../utility";
import { ERR } from "../../utility/err_constant";

const { users: Users } = prisma;

export const newUserValidation = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;

  if (payload && method === "post") {
    const errors: Partial<IUserForm> = {};

    if (isEmptyString(payload.name)) {
      errors.email = {
        message: "Name is required"
      };
    }

    if (isEmptyString(payload.email)) {
      errors.email = {
        message: "Email is required"
      };
    }

    if (!isEmailValid(payload.email)) {
      errors.email = {
        message: "Please enter valid email"
      };
    }

    if (isEmptyString(payload.password)) {
      errors.password = {
        message: "Password is required"
      };
    }

    if (!isPasswordValid(payload.password)) {
      errors.password = {
        message: "Password is not valid"
      };
    }

    if (isEmptyString(payload.confirm_password)) {
      errors.confirm_password = {
        message: "Confirm password is required"
      };
    }

    if (payload.password !== payload.confirm_password) {
      errors.confirm_password = {
        message: "Password and confirm password does not matched"
      };
    }

    if (isEmptyString(payload.role)) {
      errors.role = {
        message: "Role is required"
      };
    }

    // const email_data = await findUniqueFieldError(Users, payload.email, "email");
    // if (email_data) throw ERR.DUBLICATE_EMAIL;

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};

export const editUserValidation = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const errors: Partial<IUserForm> = {};

    if (isEmptyString(payload.name)) {
      errors.email = {
        message: "Name is required"
      };
    }

    if (isEmptyString(payload.email)) {
      errors.email = {
        message: "Email is required"
      };
    }

    if (!isEmailValid(payload.email)) {
      errors.email = {
        message: "Please enter valid email"
      };
    }

    if (isEmptyString(payload.role)) {
      errors.role = {
        message: "Role is required"
      };
    }

    // const email_data = await findUniqueFieldError(Users, payload.email, "email");
    // if (email_data) throw ERR.DUBLICATE_EMAIL;

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};
