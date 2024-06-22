export interface ExpressExtendedRequest extends Express.Request {
  user: Record<string, any>;
}
