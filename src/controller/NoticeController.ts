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
                throw new CustomError(error.statusCode, error.message)
            }
            const { statusCode, message } = error
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
                throw new CustomError(error.statusCode, error.message)
            }
            const { statusCode, message } = error
            res.status(statusCode || 500).send({ message });
        }
    }

    getAllNotices = async (req: Request, res: Response) => {
        try {
            const result = await this.noticeBusiness.getAllNotices()
            res.status(200).send(result)
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw new CustomError(error.statusCode, error.message)
            }
            const { statusCode, message } = error
            res.status(statusCode || 500).send({ message });
        }
    }
    updateNotice = async (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    }
    deleteNotice = async (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    }

}