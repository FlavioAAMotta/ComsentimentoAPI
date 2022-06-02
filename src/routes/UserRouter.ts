import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export const UserRouter = express.Router();
const userBusiness = new UserBusiness(
    new UserDatabase(),
    new HashGenerator(),
    new IdGenerator(),
    new TokenGenerator()
);
const userController = new UserController(userBusiness);

// userRouter.post("/", userController.createNotice);
// userRouter.get("/", userController.getAllNotices);
// userRouter.get("/:id", userController.getNoticeById);
// userRouter.put("/:id", userController.updateNotice);
// userRouter.delete("/:id", userController.deleteNotice);
