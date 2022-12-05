export class AdminMarketersExcelModel {
    private username = "";
    private email = "";
    private phoneNumber = "";

    constructor(username: string, email: string, phoneNumber: string) {
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}