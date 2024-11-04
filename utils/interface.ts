import { Express, Response } from "express";

export interface IApp {
  app: Express;
  configureMiddleware(): void;
  configureRoutes(): void;
  start(port: number): void;
}

export interface IErrorClassObj {
  [key: number]: new (message: string) => Error;
}

export interface IPagination {
  skip: number;
  take: number;
}

export interface IServiceResponse {
  statusCode: number;
  payload: object;
  message: string;
}

export interface IResponseService {
  isSuccess: (statusCode: number) => boolean;
  sendResponse: (
    res: Response,
    statusCode: number,
    payload: object,
    message: string
  ) => void;
}

export interface IGetRequestUser {
  id: string;
  isActive: boolean;
}
