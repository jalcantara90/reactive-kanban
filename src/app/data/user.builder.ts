import { User } from '../shared/user.model';

export class UserBuilder {
  private user: User;

  constructor() {
    this.user = new User();
  }

  public build(): User {
    return this.user;
  }

  public withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  public withImage(image: string): UserBuilder {
    this.user.image = image;
    return this;
  }
}
