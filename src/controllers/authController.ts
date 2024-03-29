import { Request, Response } from "express";
import z from "zod";
import { authSchema, AuthDtos } from "../dtos/auth";
import User from "../schemas/userSchema";
import bcryptjs from "bcryptjs";
import  jwt from "jsonwebtoken";
import config from 'config'

export const logUser = async (req: Request, res: Response) => {
  try {
    // Validate and parse the request body
    const validatedData = authSchema.parse(req.body) as AuthDtos;

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
      
    res.send(token);
  } catch (error) {
    // If validation fails, send back an error response
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors);
    }

    // Handle other types of errors
    res.status(500).send("Internal Server Error");
  }
};
