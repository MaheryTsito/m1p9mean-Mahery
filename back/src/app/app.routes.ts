import { Router } from "express";
import { commandeRoutes } from "../collection/commande/commande.route";
import { dishRoutes } from "../collection/dish/dish.route";
import { restoRoutes } from "../collection/resto/resto.route";
import { userRoutes } from "../collection/user/user.route";
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
    this.router.use("/user", userRoutes);
    this.router.use("/commande", commandeRoutes);
    this.router.use("/resto", restoRoutes);
    this.router.use("/dish", dishRoutes);
  }
}
export const appRouter = new AppRouter().router;
