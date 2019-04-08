export class Student {
  _id: string;
  name: string;
  address: string;
  phones:[{name: String, address: {type: String}}]


  constructor(name: string, address: string, phones: [{ name: String; address: { type: String } }]) {
    this.name = name;
    this.address = address;
    this.phones = phones;
  }
}
