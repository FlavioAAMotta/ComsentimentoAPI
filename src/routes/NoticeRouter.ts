import express from "express";
import { NoticeBusiness } from "../business/NoticeBusiness";
import { NoticeController } from "../controller/NoticeController";
import { NoticeDatabase } from "../data/NoticeDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export const noticeRouter = express.Router();
const noticeBusiness = new NoticeBusiness(
    new NoticeDatabase(),
    new IdGenerator()
);
const noticeController = new NoticeController(noticeBusiness);

noticeRouter.post("/", noticeController.createNotice);
// noticeRouter.get("/notice", noticeController.getAllNotices());
// noticeRouter.put("/notice", noticeController.updateNotice());
// noticeRouter.delete("/notice", noticeController.deleteNotice());
