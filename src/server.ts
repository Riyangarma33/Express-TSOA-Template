import { HTTPStatusCode } from "@constants";
import { UnauthorizedError } from "@http-exception";
import { RegisterRoutes } from "@routes";
import * as swaggerDocument from "@swaggerConfig";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

const app = express();
const envPort: number = parseInt(process.env.PORT || "");
const port = envPort || 3000;

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err instanceof ValidateError) {
      const requestDetails = {
        endpoint: req.path,
        query: req.query,
        body: req.body,
        params: req.params,
      };

      console.warn(
        `Caught Validation Error for ${requestDetails.endpoint}.`,
        err.fields,
      );
      return res.status(422).json({
        error: true,
        message: `Validation Failed on endpoint ${req.path} with input: ${JSON.stringify(requestDetails)}`,
      });
    }

    // Unauthorized Error from @Security Decorator
    if (err instanceof UnauthorizedError) {
      return res.status(HTTPStatusCode.Unauthorized).json({
        error: true,
        message: "Unauthorized",
      });
    }

    if (err instanceof Error) {
      return res.status(HTTPStatusCode.InternalServerError).json({
        error: true,
        message: "Internal Server Error",
      });
    }

    next();
  },
);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
