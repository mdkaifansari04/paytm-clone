import { NextFunction, Response } from "express";
import Joi from "joi";
import { CustomRequest } from "../types";
import { validateSchema } from "../utils/validation";

export const userInputValidation = (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().min(8).max(20),
    name: Joi.string().required(),
  });

  validateSchema({ schema: user, req, next });
};
