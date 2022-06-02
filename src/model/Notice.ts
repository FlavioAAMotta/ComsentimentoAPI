export class Notice {
    constructor(
        private noticeId: string,
        private noticeTitle: string,
        private noticeDescription: string,
        private noticeOpeningDate: string,
        private noticePDFDetailsPath: string,
        private noticeStatus: boolean
    ) { }
    public getId(): string {
        return this.noticeId;
    }

    public getNoticeTitle(): string {
        return this.noticeTitle;
    }

    public getNoticeDescription(): string {
        return this.noticeDescription;
    }

    public getNoticeOpeningDate(): string {
        return this.noticeOpeningDate;
    }

    public getNoticePDFDetails(): string {
        return this.noticePDFDetailsPath;
    }
    public getNoticeStatus(): boolean {
        return this.noticeStatus;
    }
}