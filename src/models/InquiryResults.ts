/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectLike } from 'src/models/ObjectLike';

type FunctionParams<T extends ObjectLike> = {
  [key in keyof T]: T[key] extends (...args: any[]) => any ? key : never;
}[keyof T];

// TODO: enforce that the name of the question is the same as the method name
export type InquiryResult<
  T extends ObjectLike,
  K extends FunctionParams<T> = FunctionParams<T>,
> = {
  [key in K]: ReturnType<T[key]>;
};
