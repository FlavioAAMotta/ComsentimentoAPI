import { UserBusiness } from './../business/UserBusiness';
import { Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    createUser = async (req: Request, res: Response) => {
        try {
            const { userName, userEmail, userPassword } = req.body;
            const result = await this.userBusiness.createUser(
                userName,
                userEmail,
                userPassword
            );
            res.status(201).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const result = await this.userBusiness.getAllUsers()
            res.status(200).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try {
            const userID = req.params.id
            const result = await this.userBusiness.getUserById(userID)
            res.status(200).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }
}