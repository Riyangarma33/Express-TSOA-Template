import { HTTPStatusCode } from "@constants";

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class UnauthorizedError extends HttpException {
  constructor() {
    super(HTTPStatusCode.Unauthorized, "Unauthorized");
  }
}
