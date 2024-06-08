import { pingSchema } from "@schemas/pingSchemas";
import { RegularResponse } from "@schemas/regularSchemas";
import { Controller, Example, Get, Query, Response, Route, Tags } from "tsoa";

@Route("ping")
@Tags("Ping")
export class PingController extends Controller {
  /**
   * @param {string} name Your Name
   * @returns Promise<RegularResponse>
   */
  @Get("/")
  @Response<RegularResponse>("200", "Success")
  @Example<RegularResponse>({
    error: false,
    message: "Pong for Anonymous",
  })
  @Response<RegularResponse>("500", "Internal Server Error", {
    error: true,
    message: "Internal Server Error",
  })
  public async ping(@Query() name?: string): Promise<RegularResponse> {
    const { error } = pingSchema.validate({ name });
    if (error) {
      this.setStatus(422);
      return {
        error: true,
        message: error.details[0].message,
      };
    }
    return {
      error: false,
      message: "Pong for " + (name ? name : "Anonymous"),
    };
  }
}
