import {IRole} from './role';
export interface IUser {
    username: string,
    id?: string,
    fname?: string,
    lname?: string,
    password?: string,
    roles?: Array<IRole>
}