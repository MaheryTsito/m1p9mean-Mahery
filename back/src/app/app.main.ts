import { Server } from "http";
import * as cors from "cors";
import * as express from "express";
import { appRouter } from "./app.routes";
import * as bodyParser from "body-parser";
export class App {
  private readonly app: express.Application;
  constructor() {
    this.app = express();
  }

  public init(port: number): Server {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.initRoutes();
    return this.app.listen(port, () => {
      console.log(`Application has started, listening on port ${port}`);
    });
  }

  private initRoutes() {
    const corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    this.app.use("/api", appRouter);
    this.app.use(cors(corsOptions));
  }
}
export const app = new App();
