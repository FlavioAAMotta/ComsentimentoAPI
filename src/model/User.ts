export class User {
    constructor(
        private userId: string,
        private userName: string,
        private userEmail: string,
        private userPassword: string        
    ) { }

    public getId(): string {
        return this.userId;
    }

    public getName(): string {
        return this.userName;
    }

    public getNoticeEmail(): string {
        return this.userEmail;
    }

    public getNoticePassword(): string {
        return this.userPassword;
    }

}