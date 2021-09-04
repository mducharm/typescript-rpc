import { Req, Res } from "./common";

declare namespace Express {
    export interface Request extends Req {}
    export interface Response extends Res {}
  }