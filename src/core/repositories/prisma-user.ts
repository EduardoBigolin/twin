import { PrismaClient } from "@prisma/client";
import { Password } from "../domain/user/entity/Password";
import { User } from "../domain/user/entity/User";
import { UserRepository } from "../domain/user/repositories/User-repos";
import { UserDto } from "../domain/user/user-dto";

export class userPrismaRepository implements UserRepository {
  private prisma = new PrismaClient();

  async save(user: UserDto): Promise<User> {
    const userSave = await this.prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        name: user.userName,
      },
    });

    const userEntity = new User({
      email: userSave.email,
      firstName: userSave.firstName,
      lastName: userSave.lastName,
      password: new Password(userSave.password),
      userName: userSave.name,
    });
    userEntity.setId(userSave.id);

    return userEntity;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userSave = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userSave) return null;

    const userEntity = new User({
      email: userSave.email,
      firstName: userSave.firstName,
      lastName: userSave.lastName,
      password: new Password(userSave.password),
      userName: userSave.name,
    });
    userEntity.setId(userSave.id);

    return userEntity;
  }
}
