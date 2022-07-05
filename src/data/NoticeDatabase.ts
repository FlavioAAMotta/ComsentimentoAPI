import { NoticesInfoDTO } from "./../types/NoticesInfoDTO";
import { Notice } from "./../model/Notice";
import { BaseDatabase } from "./BaseDatabase";
export class NoticeDatabase extends BaseDatabase {
  protected TABLE_NAME: string = "Notices";

  createNotice = async (notice: Notice): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert(notice);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getAllNotices = async (limit: number, offset: number): Promise<Notice[]> => {
    try {
      return (await this.connection(this.TABLE_NAME)
        .offset(offset)
        .orderBy("noticeOpeningDate", "desc")
        .limit(limit)) as Notice[];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getNoticesInfo = async (): Promise<any> => {
    try {
      const query = await this.connection(this.TABLE_NAME)
        .count("noticeStatus")
        .groupBy("noticeStatus");
      const result: NoticesInfoDTO = {
        totalOpened: query[0]["count(`noticeStatus`)"] as number,
        totalClosed: query[1]["count(`noticeStatus`)"] as number,
      };
      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getNoticeById = async (noticeId: string): Promise<Notice> => {
    try {
      const [result] = await this.connection(this.TABLE_NAME).where({
        noticeId,
      });
      return result as Notice;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  updateNotice = async (notice: Notice): Promise<void> => {
    try {
      let noticeId = notice.getId();
      await this.connection(this.TABLE_NAME)
        .update({
          noticeTitle: notice.getNoticeTitle(),
          noticeDescription: notice.getNoticeDescription(),
          noticeOpeningDate: notice.getNoticeOpeningDate(),
          noticePDFDetails: notice.getNoticePDFDetails(),
          noticeStatus: notice.getNoticeStatus(),
        })
        .where({ noticeId });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  deleteNotice = async (noticeId: string): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).where({ noticeId }).delete();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
