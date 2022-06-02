import { Notice } from './../model/Notice';
import { IdGenerator } from './../services/idGenerator';
import { NoticeDatabase } from './../data/NoticeDatabase';
import { CustomError } from './../errors/CustomError';
export class NoticeBusiness {

    constructor(private noticeDatabase: NoticeDatabase, private idGenerator: IdGenerator) { }

    public async createNotice(
        noticeTitle: string,
        noticeDescription: string,
        noticeOpeningDate: Date,
        noticePDFDetails: File,
        noticeStatus: boolean
    ) {
        try {
            if (!noticeTitle || !noticeDescription || !noticeOpeningDate || !noticePDFDetails || !noticeStatus) {
                throw new CustomError(422, "Missing input");
            }
            const noticeId = this.idGenerator.generate();
            await this.noticeDatabase.createNotice(
                new Notice(
                    noticeId,
                    noticeTitle,
                    noticeDescription,
                    noticeOpeningDate,
                    noticePDFDetails,
                    noticeStatus)
            )
            return "Criado com sucesso";
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }

    }

}