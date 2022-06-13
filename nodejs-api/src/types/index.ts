import {Request} from "express";
import { IncomingMessage, ServerResponse} from "http";


export interface RequestWithSession extends ApiRequest{
  user: {
    userId: string,
    role: string
  } | null
}

export type ObjectFlags<Type> = {
  [Property in keyof Type]: any;
};




declare type Send<T> = (body: T) => void;

export declare type ApiResponse<T = any> = ServerResponse & {
  /**
   * Send data `any` data in response
   */
  send: Send<T>;
  /**
   * Send data `json` data in response
   */
  json: Send<T>;
  status: (statusCode: number) => ApiResponse<T>;
  redirect(url: string): ApiResponse<T>;
  redirect(status: number, url: string): ApiResponse<T>;
}



export interface ApiRequest <T = any>  extends Request{
  /**
   * Object of `query` values from url
   */
  query: {
    [key: string]: string | string[];
  };
  params: {
    [key: string]: string | string[];
  };

  /**
   * Object of `cookies` from header
   */
  cookies: {
    [key: string]: string;
  };
  body: T
}
