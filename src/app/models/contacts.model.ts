export class Contact {
  name: string;
  email: string;
  phone: string;
  id: string

  constructor(id: string, name: string, email: string, phone: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.id = id;
  }
}