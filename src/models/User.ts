import {Account} from "./Account";
import {Address} from "./Address";

export interface User{
    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string; 
    createdAt: string; 
    account?:Account;
    address?:Address;
}