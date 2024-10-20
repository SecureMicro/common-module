import { CustomApiError } from "./CustomApiError";

export class NotAuthorisedError extends CustomApiError {
  statusCode = 401;

  constructor(message: string) {
    super(message);
  }
}
