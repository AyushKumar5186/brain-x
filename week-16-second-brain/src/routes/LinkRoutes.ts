import { Router } from "express";
import { userMiddleware } from "../middleware";
import LinkModel from "../models/LinkModel";
import ContentModel from "../models/ContentModel";

const LinkRoutes: Router = Router();

function random(len: number) {
  const str = "qwertyuiopasdfghjklzxcvbnm123456789";
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += str[Math.floor(Math.random() * str.length)];
  }
  return ans;
}

LinkRoutes.post("/share", userMiddleware, async (req: any, res) => {
  const userId = req.userId;
  const { share } = req.body;
  const hash = random(10);
  try {
    if (share) {
      const link = await LinkModel.findOne({
        userId: userId,
        });
      if (link) {
        res.status(200).json({
          message: link.hash,
        });
      } else{
      await LinkModel.create({
        hash: hash,
        userId: userId,
      });
      res.status(201).json({ message: "Updated Sharable link.", hash: hash })
      }
    } else {
      await LinkModel.deleteOne({
        userId: userId,
      });
      res.status(400).json({
        message: "Sharable link removed.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error.",
    });
  }
});

LinkRoutes.get("/:sharelink", async(req, res) => {
    const {sharelink} = req.params;

    try {
        const brain = await LinkModel.findOne({
        hash: sharelink
    })
    if (brain) {  
    const content = await ContentModel.find({
        userId: brain.userId
    })
    res.status(200).json({
        content: content
    })
    } else {
        res.status(404).json({
        message: "Brain not found."
    })
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
});

export default LinkRoutes;
