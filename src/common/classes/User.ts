export class User {
  id?: number;
  name: string;
  email: string;
  role?: number;
  password?: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
