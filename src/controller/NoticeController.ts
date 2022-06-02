import { Request, Response } from "express";
import { NoticeBusiness } from "../business/NoticeBusiness"
import { CustomError } from "../errors/CustomError";

export class NoticeController {
    constructor(
        private noticeBusiness: NoticeBusiness
    ) { }

    createNotice = async (req: Request, res: Response) => {
        try {
            const { noticeTitle, noticeDescription, noticeOpeningDate, noticePDFDetails, noticeStatus } = req.body;
            const result = await this.noticeBusiness.createNotice(
                noticeTitle,
                noticeDescription,
                noticeOpeningDate,
                noticePDFDetails,
                noticeStatus);
            res.status(201).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }

    getNoticeById = async (req: Request, res: Response) => {
        try {
            const noticeID = req.params.id
            const result = await this.noticeBusiness.getNoticeById(noticeID)
            res.status(200).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }

    getAllNotices = async (req: Request, res: Response) => {
        try {
            const result = await this.noticeBusiness.getAllNotices()
            res.status(200).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }

    updateNotice = async (req: Request, res: Response) => {
        try {
            const noticeID = req.params.id
            const { noticeTitle, noticeDescription, noticeOpeningDate, noticePDFDetails, noticeStatus } = req.body;
            const result = await this.noticeBusiness.updateNotice(
                noticeID,
                noticeTitle,
                noticeDescription,
                noticeOpeningDate,
                noticePDFDetails,
                noticeStatus);
            res.status(200).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }
    
    deleteNotice = async (req: Request, res: Response) => {
        try {
            const noticeID = req.params.id
            await this.noticeBusiness.deleteNotice(noticeID)
            res.status(200).send("Notice deleted successfully")
        } catch (error: any) {
            if (error instanceof CustomError) {
                var { statusCode, message } = error
            }
            res.status(statusCode || 500).send({ message });
        }
    }

}