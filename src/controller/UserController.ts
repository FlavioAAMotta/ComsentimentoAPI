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

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body
            const token = await this.userBusiness.login(email, password)
            res.status(200).send({ message: token })

        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    };

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

    updateUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const { userName, userEmail, userPassword } = req.body;
            const token = req.headers.authorization as string;
            const result = await this.userBusiness.updateUser(
                userId,
                userName,
                userEmail,
                userPassword,
                token
            );
            res.status(200).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }
}