import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export const userRouter = express.Router();
const userBusiness = new UserBusiness(
    new UserDatabase(),
    new HashGenerator(),
    new IdGenerator(),
    new TokenGenerator()
);
const userController = new UserController(userBusiness);

userRouter.post("/", userController.createUser);
//userRouter.post("/:id", userController.signUp);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
// userRouter.put("/:id", userController.updateUser);
// userRouter.delete("/:id", userController.deleteUser);
