import { Request, Response } from "express";
import { NoticeBusiness} from "../business/NoticeBusiness"

export class NoticeController{
    constructor(
        private noticeBusiness: NoticeBusiness
    ){}
    
    createNotice = async(req: Request, res: Response) =>{
        try{ 
            const {noticeTitle, noticeDescription, noticeOpeningDate, noticePDFDetails, noticeStatus} = req.body;
            const result = await this.noticeBusiness.createNotice(
                noticeTitle, 
                noticeDescription, 
                noticeOpeningDate, 
                noticePDFDetails, 
                noticeStatus);
            res.status(201).send(result)
        }catch(error:any){
            const { statusCode, message } = error
            res.status(statusCode || 500).send({ message });
        }
    }
    public async getNotice(req: Request, res: Response){
        throw new Error("Method not implemented.");
    }
    public async getAllNotices(req: Request, res: Response){
        throw new Error("Method not implemented.");
    }
    public async updateNotice(req: Request, res: Response){
        throw new Error("Method not implemented.");
    }
    public async deleteNotice(req: Request, res: Response){
        throw new Error("Method not implemented.");
    }
    
}