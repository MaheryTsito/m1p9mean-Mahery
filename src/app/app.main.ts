import * as express from "express";
class App {
  private readonly app: express.Application;
  constructor() {
    this.app = new express();
  }

  public init(port: number) {
    return this.app.listen(port, () => {
      console.log("Application has started, listening on port ${port}");
    });
  }
}
export const app = new App();
