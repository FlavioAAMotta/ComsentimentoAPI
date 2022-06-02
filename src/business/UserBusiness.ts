import { CustomError } from './../errors/CustomError';
import { IdGenerator } from './../services/idGenerator';
import { HashGenerator } from './../services/hashGenerator';
import { TokenGenerator } from './../services/tokenGenerator';
import { UserDatabase } from './../data/UserDatabase';
import { User } from '../model/User';
export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashGenerator: HashGenerator,
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator
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
            const userId = this.idGenerator.generate();
            const hashedPassword = await this.hashGenerator.hash(userPassword);
            let newUser = new User(
                userId,
                userName,
                userEmail,
                hashedPassword
            )
            await this.userDatabase.createUser(newUser)
            const token = this.tokenGenerator.generate({ id: userId })
            return token;
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }

    getAllUsers = async()=>{
        try {
            const result = this.userDatabase.getAllUsers();
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }

    getUserById = async(userId: string)=>{
        try {
            if (!userId) {
                throw new CustomError(422, "Missing id");
            }
            const result = this.userDatabase.getUserById(userId);
            if(!result) {
                throw new CustomError(404, "User not found");
            }
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }
}