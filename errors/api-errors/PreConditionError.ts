import { CustomApiError } from "./CustomApiError";

export class PreConditionError extends CustomApiError {
  statusCode = 412;

  constructor(message: string) {
    super(message);
  }
}
