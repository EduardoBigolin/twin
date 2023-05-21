export interface IMessage<T> {
  status: number;
  message: T;
}
export class Messages<T> {
  public static SuccessCreate<T>(data: T) {
    return {
      status: 201,
      message: data,
    };
  }
  public static Success<T>(data: T) {
    return {
      status: 200,
      message: data,
    };
  }
  public static Error<T>(data: T) {
    return {
      status: 400,
      message: data,
    };
  }
}
