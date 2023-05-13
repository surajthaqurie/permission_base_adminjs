import { Response } from "express";

interface Json<ResData> {
  success: boolean;
  data: ResData;
}

type Send<ResData, T = Response> = (body?: Json<ResData>) => T;

export interface ICommonResponse<ResData> extends Response {
  json: Send<ResData, this>;
}

export interface IFormErrorMessage {
  message: string;
}
