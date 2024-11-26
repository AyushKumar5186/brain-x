import { Router } from "express";
import { userMiddleware } from "../middleware";
import { createContent, deleteAllContent, deleteSingle, getAllContent } from "../controllers/ContentController";

const ContentRoutes: Router = Router()


ContentRoutes.post("/", userMiddleware, createContent as any)
ContentRoutes.get("/", userMiddleware, getAllContent)
ContentRoutes.post("/delete", userMiddleware, deleteSingle)
// ContentRoutes.delete("/", userMiddleware, deleteAllContent)

export default ContentRoutes