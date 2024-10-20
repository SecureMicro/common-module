import { CustomApiError } from "./CustomApiError";

export class NotFoundError extends CustomApiError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}
