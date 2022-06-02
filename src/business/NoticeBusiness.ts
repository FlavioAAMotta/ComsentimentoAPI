import { Authenticator } from '../services/Authenticator';
import { Notice } from './../model/Notice';
import { IdGenerator } from './../services/idGenerator';
import { NoticeDatabase } from './../data/NoticeDatabase';
import { CustomError } from './../errors/CustomError';
export class NoticeBusiness {

    constructor(
        private noticeDatabase: NoticeDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    createNotice = async (
        noticeTitle: string,
        noticeDescription: string,
        noticeOpeningDate: string,
        noticePDFDetails: string,
        noticeStatus: boolean,
        token: string
    ) => {
        try {
            if (!noticeTitle || !noticeDescription || !noticeOpeningDate || !noticePDFDetails || !noticeStatus) {
                throw new CustomError(422, "Missing input");
            }
            if(!token){
                throw new CustomError(401, "Missing token in 'Authorization' header")
            }
            const validateToken = this.authenticator.getTokenData(token)
            if(!validateToken.id){
                throw new CustomError(401, "Invalid token")
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
        } catch (error:any) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
            throw new Error(error)
        }

    }
    
    getAllNotices = async()=>{
        try {
            const result = this.noticeDatabase.getAllNotices();
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }

    getNoticeById = async(noticeId: string)=>{
        try {
            if (!noticeId) {
                throw new CustomError(422, "Missing id");
            }
            const result = this.noticeDatabase.getNoticeById(noticeId);
            if(!result) {
                throw new CustomError(404, "Notice not found");
            }
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }

    updateNotice = async (
        noticeId: string,
        noticeTitle: string,
        noticeDescription: string,
        noticeOpeningDate: string,
        noticePDFDetails: string,
        noticeStatus: boolean
    ) => {
        try {
            if (!noticeTitle && !noticeDescription && !noticeOpeningDate && !noticePDFDetails && !noticeStatus) {
                throw new CustomError(422, "Missing input");
            }
            let noticeinDB = await this.noticeDatabase.getNoticeById(noticeId)
            if(!noticeinDB) {
                throw new CustomError(404, "Notice not found");
            }
            const notice = new Notice(
                noticeId,
                noticeTitle,
                noticeDescription,
                noticeOpeningDate,
                noticePDFDetails,
                noticeStatus)
            const result = await this.noticeDatabase.updateNotice(notice)
            return result;
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    
    }

    deleteNotice = async(noticeId: string)=>{
        try {
            if (!noticeId) {
                throw new CustomError(422, "Missing id");
            }
            const result = this.noticeDatabase.deleteNotice(noticeId);
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
        }
    }
    
}