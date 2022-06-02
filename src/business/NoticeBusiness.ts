import { Notice } from './../model/Notice';
import { IdGenerator } from './../services/idGenerator';
import { NoticeDatabase } from './../data/NoticeDatabase';
import { CustomError } from './../errors/CustomError';
export class NoticeBusiness {

    constructor(
        private noticeDatabase: NoticeDatabase,
        private idGenerator: IdGenerator
    ) { }

    createNotice = async (
        noticeTitle: string,
        noticeDescription: string,
        noticeOpeningDate: string,
        noticePDFDetails: string,
        noticeStatus: boolean
    ) => {
        try {
            if (!noticeTitle || !noticeDescription || !noticeOpeningDate || !noticePDFDetails || !noticeStatus) {
                throw new CustomError(422, "Missing input");
            }
            const noticeId = this.idGenerator.generate();
            let notice = new Notice(
                noticeId,
                noticeTitle,
                noticeDescription,
                noticeOpeningDate,
                noticePDFDetails,
                noticeStatus)
            await this.noticeDatabase.createNotice(notice)
            return notice;
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }

    }

}