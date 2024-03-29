import { CustomError } from './../errors/CustomError';
import { IdGenerator } from './../services/idGenerator';
import { HashGenerator } from './../services/hashGenerator';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from './../data/UserDatabase';
import { User } from './../model/User';
export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashGenerator: HashGenerator,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    createUser = async (
        userName: string,
        userEmail: string,
        userPassword: string
    ) => {
        try {
            if (!userName || !userEmail || !userPassword) {
                throw new CustomError(422, "Missing input");
            }
            if (userEmail.indexOf("@") === -1) {
                throw new CustomError(422, "Invalid email");
            }
            const registeredUser = await this.userDatabase.findUserByEmail(userEmail);
            if (registeredUser) {
                throw new CustomError(409, "Email already registered");
            }
            const userId = this.idGenerator.generate();
            const hashedPassword = await this.hashGenerator.hash(userPassword);
            let newUser = new User(
                userId,
                userName,
                userEmail,
                hashedPassword
            )
            await this.userDatabase.createUser(newUser)
            const token = this.authenticator.generateToken({ id: userId })
            return token;
        } catch (error:any) {
            throw new CustomError(
                error.statusCode || 500,
                error.message || "Erro interno")
        }
    }

    login = async (userEmail: string, userPassword: string) => {
        try {
            if (!userEmail || !userPassword) {
                throw new CustomError(422, "Please fill all fields")
            };

            const user: User = await this.userDatabase.findUserByEmail(userEmail) as User;
            if (!user) {
                throw new CustomError(401, "E-mail not registered")
            };

            const correctPassword = this.hashGenerator.compareHash(userPassword, user.userPassword)
            if (!correctPassword) {
                throw new CustomError(401, "Incorrect credentials")
            }

            const token = this.authenticator.generateToken({ id: user.userId });
            return token
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }

    getAllUsers = async () => {
        try {
            const result = this.userDatabase.getAllUsers();
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }

    getUserById = async (userId: string) => {
        try {
            if (!userId) {
                throw new CustomError(422, "Missing id");
            }
            const result = this.userDatabase.getUserById(userId);
            if (!result) {
                throw new CustomError(404, "User not found");
            }
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }

    updateUser = async (
        userId: string,
        userName: string,
        userEmail: string,
        userPassword: string,
        token: string
    ) => {
        try {
            if (!userName && !userEmail && !userPassword) {
                throw new CustomError(422, "Missing input");
            }

            if(!token){
                throw new CustomError(401, "Missing token in 'Authorization' header")
            }
            const validateToken = this.authenticator.getTokenData(token)
            if(!validateToken.id){
                throw new CustomError(401, "Invalid token")
            }
            if(validateToken.id != userId){
                throw new CustomError(409, "You are not authorized to update this user")
            }

            let userInDB = await this.userDatabase.getUserById(userId)
            if (!userInDB) {
                throw new CustomError(404, "User not found");
            }
            const hashedPassword = await this.hashGenerator.hash(userPassword);

            let updatedUser = new User(
                userId,
                userName,
                userEmail,
                userPassword && hashedPassword || userPassword
            )
            const result = await this.userDatabase.updateUser(updatedUser)
            return result;
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }

    }
}