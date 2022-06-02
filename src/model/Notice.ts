export class Notice {
    constructor(
        private id: string,
        private noticeTitle: string,
        private noticeDescription: string,
        private noticeOpeningDate: Date,
        private noticePDFDetails: File,
        private noticeStatus: boolean
    ) { }
    public getId(): string {
        return this.id;
    }

    public getNoticeTitle(): string {
        return this.noticeTitle;
    }

    public getNoticeDescription(): string {
        return this.noticeDescription;
    }

    public getNoticeOpeningDate(): Date {
        return this.noticeOpeningDate;
    }

    public getNoticePDFDetails(): File {
        return this.noticePDFDetails;
    }
    public getNoticeStatus(): boolean {
        return this.noticeStatus;
    }
}