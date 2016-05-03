import {IRole} from '../interfaces/role';
export class Role implements IRole {
  constructor(
        public label: string,
        public _id?: string
  ) {  }
}