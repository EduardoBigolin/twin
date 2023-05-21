import { userPrismaRepository } from "../../../core/repositories/prisma-user";
import { CreateUserService } from "../../../core/services/user/create-user";
import { Controller } from "../common/Controller";

export class CreateAccount extends Controller {
  async execute() {
    const { firstName, lastName, userName, email, password } =
      this.request.body;

    const repos = new userPrismaRepository();
    const useCase = await new CreateUserService(repos).execute({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      userName: userName,
    });

    return this.response.status(useCase.status).json(useCase.message);
  }
}
