import { IUser } from './user.interface';

export class User implements IUser {
  public id: string;
  public name: string;
  public image: string;

  constructor(user?: IUser) {
    this.id = user?.id || '';
    this.name = user?.name || '';
    this.image = user?.image || '';
  }
}
