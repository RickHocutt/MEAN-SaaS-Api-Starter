import {IUser} from '../interfaces/user';
import {Role} from '../models/role';
export class User implements IUser {
  constructor(
        public username: string,
        public password: string,
        public fname?: string,
        public lname?: string,
        public roles?: Array<Role>,
        public _id?: string,
        public confirmed?: boolean,
        public confirmedToken?:string
  ) {  }
}