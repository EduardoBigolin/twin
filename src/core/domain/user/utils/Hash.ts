import { environments } from "../../../../config/environments";
import bcrypt from "bcrypt";

export class Hash {
  public static async hashPassword(password: string) {
    return await bcrypt.hash(password, environments.bcryptSalt);
  }
  public static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
