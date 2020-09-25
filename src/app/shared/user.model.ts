import { Entity } from './entity.model';
import { IUser } from './user.interface';

export class User extends Entity implements IUser {
  public name: string;
  public image: string;

  constructor(user?: IUser) {
    super();

    this.name = user?.name || '';
    this.image = user?.image || '';
  }
}
