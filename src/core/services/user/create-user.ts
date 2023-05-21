import { Exception } from "../../domain/common/Exception/Exception";
import { Code } from "../../domain/common/code/Code";
import { Password } from "../../domain/user/entity/Password";
import { User } from "../../domain/user/entity/User";
import { UserRepository } from "../../domain/user/repositories/User-repos";
import { UserDto } from "../../domain/user/user-dto";
import { IMessage, Messages } from "../common/handleMessage/message";
import { Jwt } from "../utils/JWT";

export class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: UserDto): Promise<IMessage<any>> {
    try {
      const user = await new User({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: new Password(userData.password),
        userName: userData.userName,
      }).create();

      const userExists = await this.userRepository.findByEmail(user.email);

      if (userExists) {
        throw Exception.new({
          code: Code.BAD_REQUEST,
          overrideMessage: "User already exists",
        });
      }

      const userSave = await this.userRepository.save(user);

      const payLoad = {
        id: userSave.id as string,
        email: userSave.email,
      };
      const token = Jwt.sign(payLoad);

      return Messages.SuccessCreate({
        user: {
          id: userSave.getId(),
          email: userSave.getEmail(),
          name: userSave.getFullName(),
        },
        token,
      });
    } catch (error: any) {
      return Messages.Error(error);
    }
  }
}
