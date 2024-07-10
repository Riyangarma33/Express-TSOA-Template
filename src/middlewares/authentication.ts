import { API_KEY } from "@constants";
import { UnauthorizedError } from "@http-exception";
import * as express from "express";

export function expressAuthentication(
  req: express.Request,
  securityName: string,
): Promise<any> {
  console.warn(`securityName: ${securityName}`);
  console.warn(`req.headers: ${JSON.stringify(req.headers)}`);
  if (securityName === "ApiKeyAuth") {
    return new Promise((resolve, reject) => {
      if (req.headers["x-api-key"] === API_KEY) {
        // Return to the Controller with req.user
        resolve({
          error: false,
          message: "Allowed to Use Endpoint",
          user: "dummy",
        });
      } else {
        reject(new UnauthorizedError());
      }
    });
  }

  return Promise.reject({});
}
