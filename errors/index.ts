import { BadRequestError } from "./api-errors/BadRequestError";
import { AccessForbiddenError } from "./api-errors/AccessForbiddenError";
import { NotAuthorisedError } from "./api-errors/NotAuthorisedError";
import { NotFoundError } from "./api-errors/NotFoundError";
import { InternalServerError } from "./api-errors/InternalServerError";
import { PreConditionError } from "./api-errors/PreConditionError";
import { UnprocessableEntity } from "./api-errors/UnprocessableEntityError";
import { IErrorClassObj } from "../utils/interface";

export {
  BadRequestError,
  AccessForbiddenError,
  NotAuthorisedError,
  NotFoundError,
  InternalServerError,
  PreConditionError,
  UnprocessableEntity,
};

export const errorClassObj: IErrorClassObj = {
  400: BadRequestError,
  403: AccessForbiddenError,
  401: NotAuthorisedError,
  404: NotFoundError,
  412: PreConditionError,
  422: UnprocessableEntity,
};
