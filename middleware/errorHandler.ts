import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { QueryFailedError } from "typeorm";
import { CustomApiError } from "../errors/api-errors/CustomApiError";

// @ts-ignore
const errorHandler: ErrorRequestHandler = (err, _req: Request, res: Response, _next: NextFunction) => {
  let message: string = err.message;
  let statusCode: number = err.statusCode;

  if (err instanceof QueryFailedError) {
    message = "Insert Or Update violates unique constraint error";
    statusCode = 422;
    const errorObj = {
      name: err.name,
      message: err.message,
      query: err.query,
      parameters: err.parameters,
    };
    logger.error(JSON.stringify(errorObj));
  } else if (err instanceof CustomApiError) {
    logger.error(JSON.stringify(err.message));
  } else if (!statusCode) {
    message = "Something went wrong!";
    statusCode = 500;
    logger.error(`Error triggered from errorHandler: ${err.message}`);
  } else {
    message = "Something went wrong!";
    statusCode = 500;
    logger.error(`Error triggered from errorHandler: ${err.message}`);
  }
  return res
    .status(statusCode)
    .json({ success: false, statusCode, message, payload: {} });
};

export default errorHandler;