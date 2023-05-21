import { User } from "../entity/User";
import { UserDto } from "../user-dto";

export interface UserRepository {
  save(user: UserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
