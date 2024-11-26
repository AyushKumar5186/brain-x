import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt"
import { JWT_PASSWORD } from "../config";


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password} = req.body;

    const emailFind = await UserModel.findOne({
        email
    })

    if (emailFind) return res.status(400).json({
      message: "User already exists."
    });

    if (!email || !password)
      return res.status(400).json({
      message: "Email and Password are required."
    });

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
    
    return res.status(201).json({
        message: "you are registered successfully",
      user: {
        id: user._id,
        email: user.email,
        // profileSetup: user.profileSetup,
      },
    });
    next();
    
  } catch (error) {
    console.log({ error });
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Email and Password is required");

    const user = await UserModel.findOne({
      email,
    });

    if (!user) return res.status(400).json({
    message: "User with the given email not found."
    });

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(400).json({
    message: "Password is incorrect."
    });
    }

    if (auth) {
        const token = jwt.sign({
            id: user._id
        }, JWT_PASSWORD!)

        res.status(200).json({
          message: "You are signed in successfully.",
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
    next();
  } catch (error) {
    console.log({ error });
    res.status(500).send("Internal Server Error");
  }
};
