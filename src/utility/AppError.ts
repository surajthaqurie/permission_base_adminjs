import { Response } from "express";
export default class AppError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    // this.statusCode = statusCode || 500;
    // this.success = false;
    // this.isOperational = true;

    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

const sendUnAuthorizedError = (res: Response): any => {
  try {
    return res.status(401).json({
      success: false,
      msg: "UNAUTHORIZED"
    });
  } catch (err) {
    throw err;
  }
};

export { sendUnAuthorizedError };
