import { NextFunction, Response } from "express";
import { client } from "@repo/prisma";
import { CustomRequest } from "../../../types";
import ErrorResponse from "../../../helper/error-response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAll = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await client.user.findMany();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log("Internal server error", error);
    next(new ErrorResponse(`Internal server error ${error}`, 500));
  }
};

export const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, name } = req.value;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await client.user.create({
      data: {
        username,
        password: hashedPassword,
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


export const update = async (
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


export const login = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.value;
    const user = await client.user.findFirst({
      where: { username },
    });
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ErrorResponse("Invalid password", 401));
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    console.log("Internal server error", error);
    next(new ErrorResponse(`Internal server error ${error}`, 500));
  }
};