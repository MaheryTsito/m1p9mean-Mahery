import { Router } from "express";
class AppRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  initRoutes() {
    this.router.get("/status", (req, resp) => {
      resp.json({ status: "API is OK" });
    });
  }
}
export const appRouter = new AppRouter().router;
