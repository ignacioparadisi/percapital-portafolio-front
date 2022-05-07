export class User {
  id: number;
  name: string;
  email: string;
  role: number;

  contructor(id: number, name: string, email: string, role: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
