import { Method, ZodiosEndpointDefinitions, ZodiosPathsByMethod } from "@zodios/core";
import { ZodObject, z } from "zod";
import { ZodiosRequestHandler } from "./zodios.types";
import { RequestHandler } from "express";
import multer from "multer";

type AnyContext = ZodObject<any, z.UnknownKeysParam, z.ZodTypeAny>;

export type Middleware<
  Api extends ZodiosEndpointDefinitions,
  Context extends AnyContext,
  M extends Method,
  Path extends ZodiosPathsByMethod<Api, Method>,
> = ZodiosRequestHandler<Api, Context, M, Path>;

export const asMiddleware = <
  Api extends ZodiosEndpointDefinitions,
  Context extends AnyContext,
  M extends Method,
  Path extends ZodiosPathsByMethod<Api, Method>,
>(
  middleware: RequestHandler,
) => middleware as Middleware<Api, Context, M, Path>;

export const makeSingleMulterUpload = <
  Api extends ZodiosEndpointDefinitions,
  M extends Method,
  Path extends ZodiosPathsByMethod<Api, Method>,
>(multer: multer.Multer, singleFileFieldName: string) => asMiddleware<Api, AnyContext, M, Path>(multer.single(singleFileFieldName));

