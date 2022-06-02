import { Notice } from './../model/Notice';
import BaseDatabase from './BaseDatabase';
export class NoticeDatabase extends BaseDatabase {
    protected tableName: string = "Notices";

    public async createNotice(notice: Notice): Promise<void> {
        try {
            await BaseDatabase.connection.raw(`
              INSERT INTO ${this.tableName} (noticeId,
                noticeTitle,
                noticeDescription,
                noticeOpeningDate,
                noticePDFDetails,
                noticeStatus)
              VALUES (
              '${notice.getId()}', 
              '${notice.getNoticeTitle()}', 
              '${notice.getNoticeDescription()}',
              '${notice.getNoticeOpeningDate()}', 
              '${notice.getNoticePDFDetails()}',
              '${notice.getNoticeStatus()}'
              )`
            );
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}