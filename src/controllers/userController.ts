import { Request, Response } from "express";
import z from "zod";
import { userSchema, UserDtos } from "../dtos/user";
import User from "../schemas/userSchema";
import _ from 'lodash';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "config";

export const currentUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id).select("-password");  
    res.send(user);
}

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validate and parse the request body
    const validatedData = userSchema.parse(req.body) as UserDtos;

    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("user with this email already Registered");
    }

    // const salt =  bcryptjs.genSalt(10);

    existingUser = new User({
      name: req.body.name,
      email: req.body.email,
        password: req.body.password,
      isAdmin:req.body.isAdmin
    });
    existingUser.password = await bcryptjs.hash(existingUser.password, 10);

    await existingUser.save();
    // console.log(_.pick(existingUser,['id','email','password']))
    const token = jwt.sign({ _id: User._id,isAdmin:User.isAdmin }, config.get("jwtPrivateKey"));

    res
      .header("x-token", token)
      .status(201)
      .send({
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
      });
  } catch (error) {
    // If validation fails, send back an error response
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors);
    }

    // Handle other types of errors
    res.status(500).send("Internal Server Error");
  }
};
