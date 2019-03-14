export class User {
    _id:string;
    first_name: string;
    last_name: string;
    address_line1: string;
    country: string = "CNS";
    city :string;
    address_line2: string;
    postal_code: string;
    state: string;
    nic: string;
    telephone: string;
    mobile: string;
    roleId: string = "0";
    userName: string;
    password: string;
    profile_pic: any = "../../../assets/img/default-avatar.png";
}