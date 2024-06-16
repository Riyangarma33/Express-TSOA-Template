import { HTTPStatusCode, URLENCODED } from "@constants";
import { loginRequest, loginSchema } from "@schemas/authSchemas";
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
    @Request() request: Express.Request,
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
    console.warn(`User: ${(request as any).user.user}`);
    // Not Implemented
    this.setStatus(HTTPStatusCode.NotImplemented);
    return {
      error: true,
      message: "Not Implemented",
    };
  }
}
