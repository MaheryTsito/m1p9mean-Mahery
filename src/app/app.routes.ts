import { Router } from "express";
class AppRouter {
  router: Router;
  constructor() {
    this.router = new Router();
    this.initRoutes();
  }
  initRoutes() {
    this.router.get("/api-status", (req, resp) => {
      resp.json({ status: "API is OK" });
    });
  }
}
const appRouter = new AppRouter();
