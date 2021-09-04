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

export type MiddlwareImpl<T, TFunc extends (...req: any) => any> = { 
  [Property in KeyOf<T>]: (req: Parameters<TFunc>['req']) => { response?: ReturnType<TFunc>, error?: Err }
};

export type MiddlwareFunc<TRequest, TResponse> = (req: TRequest) => { response?: TResponse, error?: Err } 