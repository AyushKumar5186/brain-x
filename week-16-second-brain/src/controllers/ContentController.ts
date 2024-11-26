import { NextFunction, Request, Response } from "express";
import ContentModel from "../models/ContentModel";

export const createContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    if (!link || !title) {
      return res.status(400).json({
        message: "All credentials required.",
      });
    }
    await ContentModel.create({
      title,
      link,
      type,
      // @ts-ignore
      userId: req.userId,
      tags: [],
    });

    res.json({
      message: "Content added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

export const getAllContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
      userId: userId,
    }).populate("userId", "email");

    res.status(200).json({
      content
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};


export const deleteSingle = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const {title} = req.body;
        // @ts-ignore
        const userId = req.userId

        const deleteOne = await ContentModel.findOneAndDelete({
          userId,
          title
        })

        

        if (deleteOne) {
            res.status(200).json({
                message: "Content deleted."
            })
        }
    } catch (error) {
        console.log(error)
    res.status(500).json({
        message: "Internal Server Error."
    })
    }
}

export const deleteAllContent = async (req: Request, res: Response, next: NextFunction)=> {
    try {

    await ContentModel.deleteMany({
        
        // @ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
    } catch (error) {
        console.log(error)
    res.status(500).json({
        message: "Internal Server Error."
    })
    }
}