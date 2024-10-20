import { CustomApiError } from "./CustomApiError";

export class NotAcceptableError extends CustomApiError {
  statusCode = 406;

  constructor(message: string) {
    super(message);
  }
}
