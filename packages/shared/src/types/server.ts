import { NextFunction, Request, Response } from 'express';
import { Err } from './common';
import { KeyOf } from './utilities';

type TypedRequest<
  ReqBody = Record<string, unknown>,
  QueryString = Record<string, unknown>
  > = Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Partial<ReqBody>,
    Partial<QueryString>
  >;

export type ExpressMiddleware<
  ReqBody = Record<string, unknown>,
  Res = Record<string, unknown>,
  QueryString = Record<string, unknown>
  > = (
    req: TypedRequest<ReqBody, QueryString>,
    res: Response<Res>,
    next: NextFunction
  ) => Promise<void> | void;
  

export type MiddlewareCalls<T> = T extends
  { [Property in keyof T]: (...req: infer Rq) => infer Rs }
    ? { [Property in keyof T]: (...req: Rq) => { response?: Rs, error?: Err } }
    : never;
