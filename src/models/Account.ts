import { Role } from "./Role";

export interface Account {
    username: string;
    password: string;
    role?: Role;
}