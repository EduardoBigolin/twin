import "dotenv/config";

export const environments = {
  port: parseInt(process.env.PORT as string),
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiration: process.env.JWT_EXPIRATION as string,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT as string),
};
