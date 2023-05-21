import { IsString, Length } from "class-validator";
import { Hash } from "../utils/Hash";

export class Password {
  @IsString()
  @Length(6, 30)
  private password: string;

  constructor(password: string) {
    this.password = password;
  }

  public async getHashedPassword(): Promise<string> {
    return await Hash.hashPassword(this.password);
  }

  public comparePassword(password: string): boolean {
    return this.password === password;
  }
}
