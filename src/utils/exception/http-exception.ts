import { HTTPStatusCode } from "@constants";

export class HttpException extends Error {
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

export class InternalServerError extends HttpException {
  constructor(message?: string) {
    super(
      HTTPStatusCode.InternalServerError,
      message ? message : "Internal Server Error",
    );
  }
}

export class ConflictError extends HttpException {
  constructor(message?: string) {
    super(HTTPStatusCode.Conflict, message ? message : "Conflict");
  }
}
