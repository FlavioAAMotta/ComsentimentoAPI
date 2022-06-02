import express from "express";
import { NoticeBusiness } from "../business/NoticeBusiness";
import { NoticeController } from "../controller/NoticeController";
import { NoticeDatabase } from "../data/NoticeDatabase";
import { IdGenerator } from "../services/idGenerator";
import { Authenticator } from "../services/Authenticator";

export const noticeRouter = express.Router();
const noticeBusiness = new NoticeBusiness(
    new NoticeDatabase(),
    new IdGenerator(),
    new Authenticator()
);
const noticeController = new NoticeController(noticeBusiness);

noticeRouter.post("/", noticeController.createNotice);
noticeRouter.get("/", noticeController.getAllNotices);
noticeRouter.get("/:id", noticeController.getNoticeById);
noticeRouter.put("/:id", noticeController.updateNotice);
noticeRouter.delete("/:id", noticeController.deleteNotice);
