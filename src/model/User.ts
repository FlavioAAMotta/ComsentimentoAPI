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

    public getEmail(): string {
        return this.userEmail;
    }

    public getPassword(): string {
        return this.userPassword;
    }

}