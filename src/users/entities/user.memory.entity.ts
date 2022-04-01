export class User {
  private _id: number;
  private _name: string;
  private _firstname: string;
  private _lastname: string;
  private _email: string;

  public constructor(
    id: number,
    name: string,
    firstname: string,
    lastname: string,
    email: string,
  ) {
    this._id = id;
    this._name = name;
    this._firstname = firstname;
    this._lastname = lastname;
    this._email = email;
  }

  public get id() {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name() {
    return this._name;
  }

  public set firstname(firstname: string) {
    this._firstname = firstname;
  }

  public get firstname() {
    return this._firstname;
  }

  public set lastname(lastname: string) {
    this._lastname = lastname;
  }

  public get lastname() {
    return this._lastname;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get email() {
    return this._email;
  }

}
