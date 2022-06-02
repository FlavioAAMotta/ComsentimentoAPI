import { Notice } from './../model/Notice';
import { BaseDatabase } from './BaseDatabase';
export class NoticeDatabase extends BaseDatabase {

  protected TABLE_NAME: string = "Notices";

  createNotice = async (notice: Notice): Promise<void> => {
    try {
      await this
        .connection(this.TABLE_NAME)
        .insert(notice)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  getAllNotices = async (): Promise<Notice[]> => {
    try {
      return await this
        .connection(this.TABLE_NAME) as Notice[]
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  getNoticeById = async (noticeId: string): Promise<Notice> => {
    try {
      const [result] = await this
        .connection(this.TABLE_NAME)
        .where({ noticeId })
      return result as Notice
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  updateNotice = async (notice: Notice): Promise<void> => {
    try {
      let noticeId = notice.getId()
      await this
        .connection(this.TABLE_NAME)
        .update({
          noticeTitle: notice.getNoticeTitle(),
          noticeDescription: notice.getNoticeDescription(),
          noticeOpeningDate: notice.getNoticeOpeningDate(),
          noticePDFDetails: notice.getNoticePDFDetails(),
          noticeStatus: notice.getNoticeStatus()
        })
        .where({ noticeId })
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  deleteNotice = async (noticeId: string): Promise<void> => {
    try {
      await this
        .connection(this.TABLE_NAME)
        .where({ noticeId })
        .delete()
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}