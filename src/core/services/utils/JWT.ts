import jwt from "jsonwebtoken";
import { environments } from "../../../config/environments";

interface payLoadLogin {
  id: string;
  email: string;
}

export class Jwt {
  public static sign(payload: payLoadLogin) {
    return jwt.sign(payload, environments.jwtSecret, {
      expiresIn: environments.jwtExpiration,
    });
  }
  public static verify(token: string) {
    return jwt.verify(token, environments.jwtSecret);
  }
}
