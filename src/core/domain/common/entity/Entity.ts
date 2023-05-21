import { ValidationError, validate } from "class-validator";
import { Exception } from "../Exception/Exception";
import { Code } from "../../common/code/Code";

export type ClassValidationDetails = {
  context: string;
  errors: ClassValidationErrors[];
};

export type ClassValidationErrors = {
  property: string;
  message: string[];
};

export class ClassValidator {
  public static async validate<TTarget extends object>(
    target: TTarget,
    context?: string
  ) {
    let details: ClassValidationDetails;
    const errors: ValidationError[] = await validate(target);
    if (errors.length > 0) {
      details = {
        context: context || target.constructor.name,
        errors: [],
      };
      for (const error of errors) {
        details.errors.push({
          property: error.property,
          message: error.constraints ? Object.values(error.constraints) : [],
        });
      }
      return details;
    }
  }
}

export class Entity {
  public async validate(): Promise<void> {
    const details = await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({
        code: Code.BAD_REQUEST,
        data: details,
        overrideMessage: details.errors[0].message[0],
      });
    }
  }
}
