export class UsersResponse {
    allUsers: AllUser[] = [];
}

export class AllUser {
    userName: string = "";
    role: string = "";
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
    personalImage: MarketerLogo = new MarketerLogo();
    marketerLogo: MarketerLogo = new MarketerLogo();
}

export class DropphiLink {
    name: string = "";
    url: string = "";
}

export class MarketerLogo {
    name: string = "";
    type: string = "";
    image: string = "";
}
