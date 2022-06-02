import { User } from './../model/User';
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    protected TABLE_NAME: string = "Users";

    createUser = async (user: User): Promise<void> => {
        try {
            await this
                .connection(this.TABLE_NAME)
                .insert(user)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    findUserByEmail = async (userEmail: string): Promise<User> => {
        try {
            const [result] = await this
                .connection(this.TABLE_NAME)
                .select()
                .where({ userEmail: userEmail })
            return result as User
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getAllUsers = async (): Promise<User[]> => {
        try {
            return await this
                .connection(this.TABLE_NAME) as User[]
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getUserById = async (userId: string): Promise<User> => {
        try {
            const [result] = await this
                .connection(this.TABLE_NAME)
                .where({ userId })
            return result as User
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    updateUser = async (user: User): Promise<void> => {
        try {
          let userId = user.getId()
          await this
            .connection(this.TABLE_NAME)
            .update({
                userName: user.getName(),
                userEmail: user.getEmail(),
                userPassword: user.getPassword()
            })
            .where({ userId })
        } catch (error: any) {
          throw new Error(error.sqlMessage || error.message)
        }
      }
}