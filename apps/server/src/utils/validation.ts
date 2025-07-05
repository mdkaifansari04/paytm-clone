import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import ErrorResponse from "../helper/error-response";
import { CustomRequest } from "../types";

export const validateSchema = ({
  schema,
  req,
  next,
}: {
  schema: Schema;
  req: CustomRequest;
  next: NextFunction;
}) => {
  const { error, value } = schema.validate(req.body);
  if (error) next(new ErrorResponse("Validation error", 500));
  req.value = value;
};
