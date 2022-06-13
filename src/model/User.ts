export class User {
    constructor(
        public userId: string,
        public userName: string,
        public userEmail: string,
        public userPassword: string        
    ) { }

    getId(): string{
        return this.userId;
    }
    
    getName(): string {
        return this.userName;
    }

    getEmail(): string {
        return this.userEmail;
    }

    getPassword(): string{
        return this.userPassword;
    }

}