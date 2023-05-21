import { IsEmail, IsString } from "class-validator";
import { Entity } from "../../common/entity/Entity";
import { Password } from "./Password";

interface UserEntity {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: Password;
}

export class User extends Entity {
  public id: string | null;

  @IsString()
  public userName: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  public password: Password;

  constructor(payLoad: UserEntity) {
    super();
    this.firstName = payLoad.firstName;
    this.lastName = payLoad.lastName;
    this.userName = payLoad.userName;
    this.email = payLoad.email;
    this.password = payLoad.password;
    this.id = null;
  }

  setId(id: string) {
    this.id = id;
  }

  public getId(): string | null {
    return this.id;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getUserName(): string {
    return this.userName;
  }

  public getEmail(): string {
    return this.email;
  }

  public async create() {
    await this.validate();

    return {
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      password: await this.password.getHashedPassword(),
    };
  }
}
