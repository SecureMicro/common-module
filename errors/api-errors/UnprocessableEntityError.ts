import { CustomApiError } from "./CustomApiError";

export class UnprocessableEntity extends CustomApiError {
  statusCode = 422;

  constructor(message: string) {
    super(message);
  }
}
