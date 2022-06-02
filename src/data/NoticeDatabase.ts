import { Notice } from './../model/Notice';
import { BaseDatabase } from './BaseDatabase';
export class NoticeDatabase extends BaseDatabase {
  protected TABLE_NAME: string = "Notices";

  createNotice = async (notice: Notice): Promise<void> => {
    try {
      console.log(this.TABLE_NAME)
      console.log(notice)
      await this
        .connection(this.TABLE_NAME)
        .insert(notice)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}