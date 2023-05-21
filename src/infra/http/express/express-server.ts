import express, { Express } from "express";
import routes from "./express-route";
import { Server } from "../common/Server";

export class ExpressServer extends Server<Express> {
  private app: Express = express();
  open(): void {
    this.app = express();
    this.middleware();
    this.routes();
    this.app.listen(this.PORT, () => {
      console.log(
        `[HTTP] your server is running on http://localhost:${this.PORT}`
      );
    });
  }
  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use("/api", routes);
  }
}
