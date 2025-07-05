import { NextFunction, Response } from "express";
import { client } from "@repo/prisma";
import { CustomRequest } from "../../../types";
import ErrorResponse from "../../../helper/error-response";

export const createUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, name } = req.value;
    const newUser = await client.user.create({
      data: {
        username,
        password,
        name,
      },
    });
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("Internal server error", error);
    next(new ErrorResponse(`Internal server error ${error}`, 500));
  }
};


export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { username, password, name } = req.value;
    const updatedUser = await client.user.update({
      where: { id: Number(id) },
      data: { username, password, name },
    });
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Internal server error", error);
    next(new ErrorResponse(`Internal server error ${error}`, 500));
  }
};
