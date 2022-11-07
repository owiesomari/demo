export class UserRequest {
    userName: string = "";
    command: Command = new Command();
    personalImage: string = "";
    marketerLogo: string = "";
}

export class Command {
    firstName: string = "";
    lastName: string = "";
    country: string = "";
    city: string = "";
    town: string = "";
    address1: string = "";
    address2: string = "";
    postCode: string = "";
    company: string = "";
    email: string = "";
    phoneNumber: string = "";
    dropphiLinks: DropphiLink[] = [];
    oldPassword: string = "";
    newPassword: string = "";
    reEnteredNewPassword: string = "";
    personalImage: string = "";
    marketerLogo: string = "";
}

export class DropphiLink {
    name: string = "";
    url: string = "";
}
