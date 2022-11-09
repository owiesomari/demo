export class UserRequest {
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
    personalImage: MarketerLogo = new MarketerLogo();
    marketerLogo: MarketerLogo = new MarketerLogo();
}

export class DropphiLink {
    name: string = "";
    url: string = "";
}

export class MarketerLogo {
    id: string = "";
    name: string = "";
    type: string = "";
    image: string = "";
}
