import { Request, Response } from "express";

export class Controller {
  public request: Request;
  public response: Response;
  constructor(req: Request, res: Response) {
    this.request = req;
    this.response = res;
  }
}
