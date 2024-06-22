import { HTTPStatusCode, URLENCODED } from "@constants";
import registerUser from "@controllerUtils/authController/register";
import { HttpException } from "@http-exception";
import {
  loginRequest,
  loginSchema,
  registerRequest,
  registerSchema,
} from "@schemas/authSchemas";
import { ExpressExtendedRequest } from "@schemas/expressRequestSchemas";
import { RegularResponse } from "@schemas/regularSchemas";
import {
  Body,
  Consumes,
  Controller,
  Example,
  Post,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  /**
   * @param requestBody Login Request Body
   * @example requestBody {
   *  "email": "example@mail.com",
   *  "password": "password"
   * }
   */
  @Post("login")
  @Consumes(URLENCODED)
  @Security("ApiKeyAuth")
  @SuccessResponse("200", "Logged In Successfully")
  @Example<RegularResponse>({
    error: false,
    message: "Logged In Successfully",
  })
  @Response<RegularResponse>("401", "Login Failed", {
    error: true,
    message: "Login Failed",
  })
  public async login(
    @Request() request: ExpressExtendedRequest,
    @Body() requestBody: loginRequest,
  ): Promise<RegularResponse> {
    const { error } = loginSchema.validate(requestBody);
    if (error) {
      this.setStatus(HTTPStatusCode.UnprocessableEntity);
      return {
        error: true,
        message: error.details[0].message,
      };
    }
    // Show the User Data from @Security("ApiKeyAuth")
    console.warn(`User: ${request.user.user}`);
    // Not Implemented
    this.setStatus(HTTPStatusCode.NotImplemented);
    return {
      error: true,
      message: "Not Implemented",
    };
  }

  /**
   * @param requestBody Register Request Body
   * @example requestBody {
   *  "name": "John Doe",
   *  "email": "example@mail.com",
   *  "password": "password"
   * }
   */
  @Post("register")
  @Consumes(URLENCODED)
  @Security("ApiKeyAuth")
  @SuccessResponse("201", "Registered Successfully")
  @Example<RegularResponse>({
    error: false,
    message: "Registered Successfully",
  })
  @Response<RegularResponse>("409", "Conflict", {
    error: true,
    message: "Conflict",
  })
  public async register(
    @Body() requestBody: registerRequest,
  ): Promise<RegularResponse> {
    const { error } = registerSchema.validate(requestBody);
    if (error) {
      this.setStatus(HTTPStatusCode.UnprocessableEntity);
      return {
        error: true,
        message: error.details[0].message,
      };
    }

    // Register User
    try {
      await registerUser(requestBody);
      // Register Success
      this.setStatus(HTTPStatusCode.Created);
      return {
        error: false,
        message: "Registered Successfully",
      };
    } catch (error) {
      // Register Failed
      this.setStatus((error as HttpException).status);
      return {
        error: true,
        message: (error as HttpException).message,
      };
    }
  }
}
