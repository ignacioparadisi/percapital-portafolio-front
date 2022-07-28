export class User {
  static ROLE_ADMIN = 2;

  id?: number;
  name: string;
  email: string;
  roles?: [Role];
  password?: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  isAdmin(): boolean {
    return this.hasRole(User.ROLE_ADMIN);
  }

  hasRole(roleId: number): boolean {
    console.log(this.roles?.map((role) => role.id).includes(roleId));
    return this.roles?.map((role) => role.id).includes(roleId) ?? false;
  }
}

export class Role {
  id: number
  name: string
}
